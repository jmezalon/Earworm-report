import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import User from './components/User';
import { ByFav } from './components/ByFav';
import { ByGen } from './components/ByGen';
import Songs from './components/Songs';
import Profile from './components/Profile';


import axios from 'axios';
import './Main.css';

class App extends Component {
  state = {
    songs: [],
    profiles: []
  }

  getAllSongsWithUsersGenres() {
    axios.get('/songs')
    .then(res => {
      this.setState({
        songs: res.data.songs
      })
    })
    .catch(err => {
      console.log(err, "SONG CALL ERR");
    })
  }

  getAllProfilesWithFavAmount() {
    axios.get('/profile')
    .then(res => {
      this.setState({
        profiles: res.data.users
      })
    })
    .catch(err => {
      console.log(err, "Profile ERR");
    })
  }



  componentDidMount() {
    this.getAllSongsWithUsersGenres()
    this.getAllProfilesWithFavAmount()
  }

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
            <Route exact path="/profile/:id" render={(props) => <User {...props} profile={this.state.profiles}
              />}
            />
            <Route exact path="/songs" render={(props) => <Songs {...props} songs={this.state.songs}
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

export default withRouter(App);
