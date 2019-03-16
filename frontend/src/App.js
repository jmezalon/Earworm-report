import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { User } from './components/User';
import { ByFav } from './components/ByFav';
import { ByGen } from './components/ByGen';
import Songs from './components/Songs';
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
            <Route exact path="/profile/:id" render={(props) => <User {...props}
              />}
            />
            <Route exact path="/songs" render={(props) => <Songs {...props}
              />}
            />
            <Route exact path="/songs/bypop" render={(props) => <ByFav {...props}
              />}
            />
            <Route exact path="/songs/bygen" render={(props) => <ByGen {...props}
              />}
            />
          </Switch>
      </div>
    );
  }
}

export default App;
