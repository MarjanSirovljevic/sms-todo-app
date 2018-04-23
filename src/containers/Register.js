import React from 'react';
import { Redirect } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      isValid: true,
    };
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
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            label="Email"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
          />
          <Input
            type="password"
            name="passwordConfirmed"
            placeholder="Confirm Password"
            label="Confirm password"
          />
          <Button name="Register" />
        </div>
      );
    }
  }
}