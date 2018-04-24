import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';

const cellStyleTH = {background: 'palegreen', padding: '10px 15px', textAlign: 'left'};
const cellStyleTD = {background: '#f0f0f0', padding: '5px 15px'};

export default class Users extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      users: [],
    }
  }
  handleClick() {
    this.props.history.push('/add_user');
  }
  handleRemove(id) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => {
        return user.id !== id;
      })
    }));
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
  componentDidMount(){
    if(this.state.users.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        const users = json.map((user) => {
          return {...user, id: user.id.toString()}
        });
        this.setState(() => ({ users }));
      })
      .catch(error => console.log(error));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.users.length !== this.state.users.length) {
      const json = JSON.stringify(this.state.users);
      localStorage.setItem('users', json);
    }
  }
  render(){
    // console.log(this.props);
    return(
      <div style={{margin: '20px auto'}}>
        <h1>Users List</h1>
        <table style={{marginBottom: '20px'}}>
          <thead>
            <tr>
              <th style={cellStyleTH}>Full name</th>
              <th style={cellStyleTH}>Email</th> 
              <th style={cellStyleTH}>User Details</th>
              <th style={cellStyleTH}>Remove User</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map((user) => (
                <User
                  {...user}
                  key={user.id}
                  handleRemove={this.handleRemove}
                />
              ))
            } 
          </tbody>
        </table>
        <Button name="Add User" onClick={this.handleClick} />
      </div>
    )
  }
}

const User = (props) => {
  console.log(props);
  // console.log(typeof props.id)
  return (
      <tr>
          <td style={cellStyleTD}>{props.name}</td>
          <td style={cellStyleTD}>{props.email}</td>
          <td style={cellStyleTD}>
            <Link to={`/user/${props.id}`}>Details</Link>
          </td>
          <td style={cellStyleTD}>
          <a onClick={() => {
            const id = props.id;
            props.handleRemove(id);
          }}>Remove</a>
          </td>
      </tr>
  );
};