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
    profiles: [],
    comments: [],
    searchByTitle: "",
    favbutton: "",
    song: {
        fav: false
      }
  }

  goBack = () => {
    this.props.history.goBack();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleFavorite=(id) => {
    console.log(this.state.song.fav, "SONG FAV");
    console.log("i'm clicked");

    // let newfavid= parseInt(this.state.song.id)
    // if (this.state.song.fav && id === newfavid) {
    //   this.setState({
    //     favbutton: newfavid
    //   })
    // }
  }


  handleClick =  (e) => {
    console.log(parseInt(e.currentTarget.dataset.song_id), "I AM E.TARGET");
     const selectedSong = this.state.songs.find(song => {
        return song.id === parseInt(e.currentTarget.dataset.song_id)
      })
      // let favbuttons= {fav: !this.state.song.fav}
      // let newSong
      if(selectedSong){
      //   newSong = Object.assign(this.state.song, selectedSong)
      //   if (selectedSong.id === parseInt(e.currentTarget.dataset.song_id)){
      //     this.setState({
      //       song: Object.assign(newSong, favbuttons),
      //
      //     })
          this.toggleFavorite(parseInt(e.currentTarget.dataset.song_id))
        }
      }
    // }


  handleSubmit = (e) => {
    e.preventDefault()
  }

  getAllComments = () => {
    axios.get('/songs/comments')
    .then(res => {
      this.setState({
        comments: res.data.comments
      })
    })
    .catch(err => {
      console.log(err, "COMMENTS ERR");
    })
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
    this.getAllComments()
  }

  render() {
    return (
      <div className="Main">
        <Route component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home}
        />

            <Route exact path="/profile" render={(props) => <Profile {...props} comments={this.state.comments} favbutton={this.state.favbutton}  song={this.state.song} handleChange={this.handleChange} toggleFavorite={this.toggleFavorite} handleSubmit={this.handleSubmit} handleClick={this.handleClick}
              />}
            />
            <Route exact path="/profile/:id" render={(props) => <User {...props} profile={this.state.profiles} goBack={this.goBack}
              />}
            />
            <Route exact path="/songs" render={(props) => <Songs {...props} songs={this.state.songs} favbutton={this.state.favbutton} searchByTitle={this.state.searchByTitle}
            song={this.state.song} handleChange={this.handleChange} toggleFavorite={this.toggleFavorite} handleSubmit={this.handleSubmit} handleClick={this.handleClick} comments={this.state.comments}
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
