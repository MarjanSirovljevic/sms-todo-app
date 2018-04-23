import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import Input from '../components/Input';
import Button from '../components/Button';

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
      email: ''
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
    const { username, password, email } = this.state;
    console.log('username: ', username);
    console.log('password: ', password);
    console.log('email: ', email);
  }
  render() {
    if(this.props.redirectToReferrer) {
      return <Redirect to="/" />;
    }
    else {
      return (
        <div className="main" style={{marginTop: '50px'}}>
          <h1>Register Page</h1>
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
          <Button
            name="Register"
            onClick={this.register}
          />
        </div>
      );
    }
  }
}