import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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
  render() {
    return (
      <div>
        <Router>
          <div style={main}>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={AboutUs} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/add_user" component={AddUser} />
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