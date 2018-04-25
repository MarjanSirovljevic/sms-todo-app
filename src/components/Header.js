import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const header = {
  background: 'yellow',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'space-between'
};

const logo = {
  padding: '10px'
};
const nav = {
  padding: '10px'
};

const loggedUserStyle = {
  color: 'coral',
  fontWeight: 'bold',
  marginRight: '25px'
};

const Header = withRouter((props) => {
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
  const { redirectToReferrer } = props;
  let jsx;
  if(!redirectToReferrer) {
    jsx = (
      <div style={nav}>
        <Link to='/about'>About Us</Link>
        <span style={{margin: '0 10px'}}>/</span>
        <Link to="/login">Login</Link>
        <span style={{margin: '0 10px'}}>/</span>
        <Link to="/register">Register</Link>
      </div>
    );
  }
  if(redirectToReferrer) {
    jsx = (
      <div style={nav}>
        <Link to='/about'>About Us</Link>
        <span style={{margin: '0 10px'}}>/</span>
        <Link to="/tasks">Tasks</Link>
        <span style={{margin: '0 10px'}}>/</span>
        <Link to="/users">Users</Link>
        <span style={{marginLeft: '25px'}}>Welcome, <span style={loggedUserStyle}>{loggedUser.username}</span></span>
        <a onClick={() => {
          props.handleSignOut(() => {
            const authenticate = JSON.stringify({
              isAuthenticated: false
            });
            window.localStorage.setItem('authenticate', authenticate);
            window.localStorage.removeItem('loggedUser');
            props.history.push('/')
          });
        }}>Signout</a>
      </div>
    );
  }
  return (
    <header id="top" style={header}>
      <div style={logo}>
        <Link to="/">Home</Link>
      </div>
      {
        jsx
      }
    </header>
  );
});

export default Header;
