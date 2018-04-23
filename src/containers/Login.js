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
      users: []
    };
  }
  handleChange(key, value) {
    this.setState(() => ({ [key]: value }));
  }
  login() {
    console.log('login');
  }
  componentWillMount() {
    try {
      const users = JSON.parse(window.localStorage.getItem('users'));
      if(users && Array.isArray(users)) {
        this.setState(() => ({ users }));
      }
    } catch (error) {
      // do nothing
    }
  }
  render() {
    if(this.props.redirectToReferrer) {
      return <Redirect to="/"/>
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