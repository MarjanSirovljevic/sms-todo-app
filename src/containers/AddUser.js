import React from 'react';
import uuid from 'uuid';

import Input from '../components/Input';

export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      users: [],
      errorMessage: '',
      name: '',
      username: '',
      email: '',
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      phone: '',
      website: ''
    };
  }
  handleChange(key, value) {
    this.setState(() => ({ [key]: value }));
  }
  handleSubmit(e) {
    e.preventDefault();
    const { name, username, email, phone, website, street, suite, city, zipcode } = this.state;
    if(!name || !username || !email) {
      const errorMessage = "All required fields must contain some data";
      this.setState(() => ({ errorMessage }));
      return;
    }
    const newUser = {
      id: uuid(),
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        get: {
          lat: null,
          lng: null
        }
      },
      phone,
      website,
      company: {
        name: null,
        catchPhrase: null,
        bs: null
      }
    };
    this.setState((prevState) => ({
      users: [...prevState.users, newUser]
    }));
    setTimeout(() => {
      this.props.history.push('/users');
    }, 250);
  }
  componentWillMount() {
    try {
      const users = JSON.parse(window.localStorage.getItem('users'));
      if (!users || !Object.keys(users)) {
        return;
      }
      this.setState(() => ({ users }));
    } catch (error) {
      // do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.users.length !== this.state.users.length) {
      const json = JSON.stringify(this.state.users);
      localStorage.setItem('users', json);
    }
  }
  render() {
    return (
      <div className="main" style={{width: '70%', margin: '20px auto', background: 'lightgrey', padding: '40px'}}>
        <h1 style={{ margin: 0}}>Add New User</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3>Basic details</h3>
            <hr />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  label="Full Name (required)"
                  handleChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  label="Username (required)"
                  handleChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="email"
                  placeholder="Email address"
                  label="Email (required)"
                  handleChange={this.handleChange}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  label="Phone"
                  handleChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="website"
                  placeholder="Website"
                  label="Website"
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <h3>Address</h3>
            <hr />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <Input
                  type="text"
                  name="street"
                  placeholder="Street name"
                  label="Street"
                  handleChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="suite"
                  placeholder="Suite"
                  label="Suite"
                  handleChange={this.handleChange}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  label="City"
                  handleChange={this.handleChange}
                />
                <Input
                  type="text"
                  name="zipcode"
                  placeholder="Zip code"
                  label="Zip code"
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <hr />
          <input type="submit" value="Add new user"/>
          {this.state.errorMessage && <p style={{color: 'red'}}>{this.state.errorMessage}</p>}
        </form>
      </div>
    );
  }
}