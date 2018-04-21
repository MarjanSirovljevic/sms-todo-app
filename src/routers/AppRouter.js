import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../containers/Home';
import AboutUs from '../containers/AboutUs';
import Login from '../containers/Login';
import Register from '../containers/Register';

export default class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={AboutUs} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
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