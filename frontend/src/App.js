import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import User from './components/users/User';
import { ByFav } from './components/ByFav';
import { ByGen } from './components/ByGen';
import Songs from './components/Songs';
import Profile from './components/Profile';


import axios from 'axios';
import './Main.css';

class App extends Component {
  _isMounted = false;
  state = {
    songs: [],

    genres: [],
    profiles: [],
    comments: [],
    searchByTitle: "",
    favbutton: "",
    song: {
        fav: false
      },

    title: "",
    img_url: "",
    genreSelect: "",
    myProfileSongs: [],
    myFavorite: [],
    myFavSongList: [],
    myProfile: []


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

  //this is all the handles

  handleSelect = async (e) => {
    await this.setState({
      [e.target.name] : e.target.value
    })
    // if (this.state.genreSelect !== "clear") {
    //   this.getAllMoviesBySpecificGenre()
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






////this is all the gets request

  getAllGenres = () => {
    axios.get("/songs/bygen")
    .then(res => {
      this.setState({
        genres: res.data.genres
      })
    })
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


  //// this is all the post request and profile display
  handleSubmit = async (e) => {
    e.preventDefault()
    await this.postNewSong()
    await this.setState({
      title: "",
      img_url: "",
      genreSelect: ""
    })
    this.getMyProfileSongs()
    this.getAllSongsWithUsersGenres()
  }

  getMyProfileSongs = () => {
    axios.get("/songs/user/1")
    .then(res => {
      this.setState({
        myProfileSongs: res.data.songs
      })
    }).catch(err => {
      console.log(err, "myProfile Song ERR");
    })
  }

  getMyFavSongList = () => {
    axios.get("/profile/bypop/1")
    .then(res => {
      this.setState({
        myFavorite: res.data.favorites
      })
    }).catch(err => {
      console.log(err, "myProfile song list ERR");
    })
  }

  getMyProfileInfo = () => {
    axios.get("/profile/1")
    .then(res => {
      this.setState({
        myProfile: res.data.user
      })
    }).catch(err => {
      console.log(err, "myProfileERR");
    })
  }


  postNewSong = () => {
    let song = {
      title: this.state.title,
      img_url: this.state.img_url,
      user_id: 1,
      genre_id: parseInt(this.state.genreSelect)
    }
    axios.post('/songs', song)
    .then(res => {
      this.setState({
        myProfileSongs: [res.data.song, ...this.state.myProfileSongs],
        songs: [res.data.song, ...this.state.songs]
      })
      this.getMyProfileSongs()
      this.getAllSongsWithUsersGenres()
    })
    .catch(err => {
      console.log(err, "posting music err");
    })
  }

  componentDidMount() {
    this.getAllSongsWithUsersGenres()
    this.getAllProfilesWithFavAmount()
    this.getAllComments()
    this.getAllGenres()
    this.getMyProfileInfo()
    this.getMyProfileSongs()
    this.getMyFavSongList()

  }
  

  render() {
    return (
      <div className="Main">
        <Route component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home}
        />

            <Route exact path="/profile" render={(props) => <Profile {...props}
            comments={this.state.comments} favbutton={this.state.favbutton}
            song={this.state.song}
            handleSelect={this.handleSelect}
            toggleFavorite={this.toggleFavorite}
            handleClick={this.handleClick}
            genres={this.state.genres}

            title={this.state.title}
            img_url={this.state.img_url}
            songs={this.state.songs}
            genreSelect={this.state.genreSelect}
            myFavorite={this.state.myFavorite}
            myProfile={this.state.myProfile}
            myProfileSongs={this.state.myProfileSongs}
            getMyProfileInfo={this.getMyProfileInfo}
            getMyProfileSongs={this.getMyProfileSongs}
            getMyFavSongList={this.getMyFavSongList}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
              />}
            />
            <Route exact path="/profile/:id" render={(props) => <User {...props} profiles={this.state.profiles} goBack={this.goBack}
            comments={this.state.comments} favbutton={this.state.favbutton}
            song={this.state.song}
            handleSelect={this.handleSelect}
            toggleFavorite={this.toggleFavorite}
            handleClick={this.handleClick}
            genres={this.state.genres}

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
