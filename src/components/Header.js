import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const header = {
  background: '#3d75aa',
  color: 'white',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'space-between',
  height: '70px',
  borderBottom: '3px solid coral',
  padding: '0 50px'
};
const logo = {
  border: '2px solid coral',
  borderRadius: '50%',
  margin: '10px',
  width: 50,
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const logoContent = {
  fontSize: '20px',
  fontWeight: 'bold'
}
const nav = {
  padding: '25px 0'
};

const loggedUserStyle = {
  color: 'MediumSeaGreen',
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
        <NavLink to='/about' activeClassName="nav-links">About Us</NavLink>
        <span style={{margin: '0 10px'}}>/</span>
        <NavLink to="/login" activeClassName="nav-links">Login</NavLink>
        <span style={{margin: '0 10px'}}>/</span>
        <NavLink to="/register" activeClassName="nav-links">Register</NavLink>
      </div>
    );
  }
  if(redirectToReferrer) {
    jsx = (
      <div style={nav}>
        <NavLink to='/about' activeClassName="nav-links">About Us</NavLink>
        <span style={{margin: '0 10px'}}>/</span>
        <NavLink to="/tasks" activeClassName="nav-links">Tasks</NavLink>
        <span style={{margin: '0 10px'}}>/</span>
        <NavLink to="/users" activeClassName="nav-links">Users</NavLink>
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
    <header id="top" style={header} className="header">
      <div style={logo}>
        <NavLink to="/" activeClassName="nav-links" exact style={logoContent}>SMS</NavLink>
      </div>
      {
        jsx
      }
    </header>
  );
});

export default Header;
