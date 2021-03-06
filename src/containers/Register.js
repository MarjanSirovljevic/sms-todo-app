import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import uuid from 'uuid';

import Input from '../components/Input';
import Button from '../components/Button';

const mainDiv = {
  width: '500px',
  margin: '60px auto',
  padding: '30px',
  background: '#fcfcfc',
  boxShadow: '0 0 10px rgba(100, 100, 100, 0.3)'
};
const hr1 = {
  height: '5px',
  background: '#3d75aa',
  marginBottom: '30px'
};
const hr2 = {
  height: '5px',
  background: '#3d75aa',
  marginTop: '40px'
};

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.usernameError = [
      'Minimum 6 characters required',
      'Must start with capital letter.'
    ];
    this.passwordError = ['Minimum 6 characters required'];
    this.passwordConfirmedError = ['Must match the previous entry'];
    this.emailError = ['Invalid email address'];

    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePasswordConfirmed = this.validatePasswordConfirmed.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
    
    this.state = {
      errorMessage: null,
      isValid: true,
      username: '',
      password: '',
      passwordConfirmed: '',
      email: '',
      regUsers: []
    };
  }
  validateUsername(value) {
    return !!value.match(/^[A-Z]\w{5,}$/);
  }
  validatePassword(value) {
    return !!value.match(/^\w{6,}$/);
  }
  validatePasswordConfirmed(value) {
    const { password } = this.state;  
    return value === password;
  }
  validateEmail(value) {
    return validator.isEmail(value);
  }
  handleChange(key, value) {
    this.setState(() => ({ [key]: value }));
  }
  register() {
    const { username, password, passwordConfirmed, email, regUsers } = this.state;
    const [usernameValid, emailValid, passwordValid, passwordChecked] = [
      this.validateUsername(username),
      this.validateEmail(email),
      this.validatePassword(password),
      this.validatePasswordConfirmed(passwordConfirmed)
    ];
    if (username === '' || password === '' || passwordConfirmed === '' || email === '') {
      const errorMessage = 'All fields are required';
      const isValid = false;
      this.setState(() => ({ errorMessage, isValid }));
      return;
    }
    if ( !usernameValid || !emailValid || !passwordValid || !passwordChecked) {
      const errorMessage = 'Some fields are not valid';
      const isValid = false;
      this.setState(() => ({ errorMessage, isValid }));
      return;
    }
    const usernameExists = regUsers.filter((user) => user.username === username).length > 0;
    const emailExists = regUsers.filter((user) => user.email === email).length > 0;
    if(usernameExists) {
      const errorMessage = 'This username is already taken!';
      const isValid = false;
      this.setState(() => ({ errorMessage, isValid }));
      return;
    }
    if(emailExists) {
      const errorMessage = 'This email is already taken!';
      const isValid = false;
      this.setState(() => ({ errorMessage, isValid }));
      return;
    }
    const errorMessage = '';
    const isValid = true;
    const newRegUser = {
      id: uuid(),
      username,
      password,
      email
    };
    this.setState((prevState) => ({
      errorMessage,
      isValid,
      regUsers: [...prevState.regUsers, newRegUser]
    }));
    
    //
    // setTimout is important here because if we immediately redirect to '/login' 
    // the asynchronious setState will cause the componentDidUpdate method not to trigger at all
    // 
    window.setTimeout(() => {
      alert('You have successfully registered !!!');
      this.props.history.push('/login');
    }, 500);
  }
  componentWillMount() {
    try {
      const regUsers = JSON.parse(window.localStorage.getItem('regUsers'));
      if(regUsers && Array.isArray(regUsers)) {
        this.setState(() => ({ regUsers }));
      }
    } catch (error) {
      // do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.regUsers.length !== this.state.regUsers.length) {
      const json = JSON.stringify(this.state.regUsers);
      localStorage.setItem('regUsers', json);
    }
  }
  render() {
    if(this.props.redirectToReferrer) {
      return <Redirect to="/" />;
    }
    else {
      return (
        <div className="main" style={mainDiv}>
          <h1 style={{marginBottom: '5px'}}>Register Page</h1>
          <hr style={hr1}/>
            {!this.state.isValid && <p style={{color: 'red'}}>{this.state.errorMessage}</p>}
          <Input
            type="text"
            name="username"
            placeholder="Username"
            label="Username"
            errorMessage={this.usernameError}
            handleValidate={this.validateUsername}
            handleChange={this.handleChange}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            label="Email"
            errorMessage={this.emailError}
            handleValidate={this.validateEmail}
            handleChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            errorMessage={this.passwordError}
            handleValidate={this.validatePassword}
            handleChange={this.handleChange}
          />
          <Input
            type="password"
            name="passwordConfirmed"
            placeholder="Confirm Password"
            label="Confirm password"
            errorMessage={this.passwordConfirmedError}
            handleValidate={this.validatePasswordConfirmed}
            handleChange={this.handleChange}
          />
          <hr style={hr2}/>
          <Button
            name="Register"
            onClick={this.register}
          />
        </div>
      );
    }
  }
}
