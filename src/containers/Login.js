import React from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      isValid: true,
      errorMessage: null,
      userOrEmail: '',
      password: '',
      regUsers: [],
      loggedUser: {}
    };
  }
  handleChange(key, value) {
    this.setState(() => ({ [key]: value }));
  }
  login() {
    const { userOrEmail, password, regUsers } = this.state;
    if(userOrEmail === '' || password ===  '') {
      const isValid = false;
      const errorMessage = 'All fields are required';
      this.setState(() => ({ isValid, errorMessage }));
      return;
    }
    const userMatch = regUsers.filter((user) => {
      return ((user.username === userOrEmail || user.email === userOrEmail) && 
      user.password === password);
    });
    const correctUserData = userMatch.length > 0;
    if(correctUserData === false) {
      const isValid = false;
      const errorMessage = 'Invalid username(email) or password';
      this.setState(() => ({ isValid, errorMessage }));
      return;
    }

    const isValid = true;
    const errorMessage = null;
    const loggedUser = userMatch[0];
    this.setState((prevState) => ({
      isValid,
      errorMessage,
      loggedUser
    }));
    
    setTimeout(() => {
      alert('You have successfully logged in !!!');
      this.props.login();
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
    if(Object.keys(prevState.loggedUser).length !== Object.keys(this.state.loggedUser).length) {
      const json = JSON.stringify(this.state.loggedUser);
      localStorage.setItem('loggedUser', json);
    }
  }
  render() {
    if(this.props.redirectToReferrer) {
      return <Redirect to="/tasks"/>
    }
    else {
      return (
        <div className="main">
          <h1>Login Page</h1>
          {!this.state.isValid && <p style={{color: 'red'}}>{this.state.errorMessage}</p>}
          <Input
            type="text"
            name="userOrEmail"
            placeholder="Username or Email"
            label="Username or Email"
            handleChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            handleChange={this.handleChange}
          />
          <Button onClick={this.login} name="Login" />
        </div>
      );
    }
  }
}