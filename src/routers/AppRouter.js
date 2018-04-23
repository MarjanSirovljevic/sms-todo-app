import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../containers/Home';
import AboutUs from '../containers/AboutUs';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Tasks from '../containers/Tasks';
import Users from '../containers/Users';
import AddUser from '../containers/AddUser';

const main = {
  display: 'flex',
  flexDirection: 'column'
};

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.signout = this.signout.bind(this);
    this.state = {
      isAuthenticated: false
    };
  }
  componentWillMount() {
    try {
      const authenticate = JSON.parse(window.localStorage.getItem('authenticate'));
      if (authenticate instanceof Object && typeof authenticate.isAuthenticated === 'boolean') {
        this.setState(() => ({ isAuthenticated: authenticate.isAuthenticated }));
      } else {
        const json = JSON.stringify(this.state);
        window.localStorage.setItem('authenticate', json);
      }
    } catch (error) {
      const json = JSON.stringify(this.state);
      window.localStorage.setItem('authenticate', json); 
    }
  }
  authenticate() {

  }
  signout() {

  }
  render() {
    return (
      <div>
        <Router>
          <div style={main}>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={AboutUs} />
              <Route
                exact
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    redirectToReferrer={this.state.isAuthenticated}
                    login={this.authenticate}
                  />
                )}
              />
              <Route
                exact
                path="/register"
                render={(props) => (
                  <Register
                    {...props}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )}
              />
              <PrivateRoute exact path="/tasks" component={Tasks} redirectToReferrer={this.state.isAuthenticated} />
              <PrivateRoute exact path="/users" component={Users} redirectToReferrer={this.state.isAuthenticated} />
              <PrivateRoute exact path="/add_user" component={AddUser} redirectToReferrer={this.state.isAuthenticated} />
              <Route render={() => (
                  <div>
                    404 - Not Found - 
                    <Link to="/" >Go Home</Link>
                  </div>
                )}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isAuthenticated ?
      <Component {...props} /> :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}
      />
    }
  />
);