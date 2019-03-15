import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import Profile from './components/Profile';


import axios from 'axios';
import './Main.css';

class App extends Component {


  render() {
    return (
      <div className="Main">
        <Route component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home}
        />

            <Route exact path="/profile" render={(props) => <Profile {...props}
              />}
            />
          </Switch>
      </div>
    );
  }
}

export default App;
