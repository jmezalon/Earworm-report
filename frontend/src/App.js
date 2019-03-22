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
    feed: [],

    genres: [],
    profiles: [],
    comments: [],
    searchByTitle: "",
    comment: "",
    song_id: "",
    favbutton: "",

    favorites: [],
    likes: [],

    title: "",
    img_url: "",
    genreSelect: "",
    myProfileSongs: [],
    myFavorite: [],
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

  //this is all the handles

  handleSelect = async (e) => {
    await this.setState({
      [e.target.name] : e.target.value
    })

  }

// will work on this some more
  postFavorites = (id) => {

    let fav = this.state.favorites.filter(f => f.user_id === 1)

    let favSong = fav.find(ff => ff.song_id === parseInt(id))

      if (!favSong) {
       axios.post('/songs/bypop', {
            song_id: parseInt(id),
            user_id: 1
          }
        )
        .then(res => {
          this.setState({
            myFavorite: [res.data.favorite, ...this.state.myFavorite],
            likes: [...this.state.likes, fav]
          })
          this.getAllFavorites()
          this.getMyProfileSongs()
          this.getAllSongsWithUsersGenresOrderByFav()
          this.getAllSongsWithUsersGenres()
          this.getAllComments()
          this.getMyProfileInfo()
          this.getMyFavSongList()
        })
        .catch(err => {
          console.log(err, "posting favorites err");
        })
      }

  }

  deleteFavorite = (id) => {
    let fav = this.state.favorites.filter(f => f.user_id === 1)

    let favSong = fav.find(ff => ff.song_id === parseInt(id))

    if (favSong) {
      axios.delete(`/songs/bypop/${favSong.id}`)
      .then(res => {
        this.getAllFavorites()
        this.getMyProfileSongs()
        this.getAllSongsWithUsersGenresOrderByFav()
        this.getAllSongsWithUsersGenres()
        this.getAllComments()
        this.getMyProfileInfo()
        this.getMyFavSongList()
      })
      .catch(err => {
        console.log(err, "delete request err");
      })
    }
  }


  handleClick = (id) => {
    this.postFavorites(parseInt(id))
    this.deleteFavorite(parseInt(id))
    }






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
        feed: res.data.songs
      })
    })
    .catch(err => {
      console.log(err, "SONG CALL ERR");
    })
  }

  getAllSongsWithUsersGenresOrderByFav() {
    axios.get('/songs/bypop')
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
    if (this.state.title && this.state.img_url && this.state.genreSelect) {
      await this.postNewSong()
      await this.setState({
        title: "",
        img_url: "",
        genreSelect: ""
      })
      this.getMyProfileSongs()
      this.getAllSongsWithUsersGenresOrderByFav()
      this.getAllSongsWithUsersGenres()
    }
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
        myFavorite: res.data.favorites,
        likes: res.data.favorites
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

  getAllFavorites = () => {
    axios.get("/songs/bypop/fav")
    .then(res => {

      this.setState({
        favorites: res.data.favorites
      })
    })
    .catch(err => {
      console.log(err, "get all fav err");
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
        songs: [res.data.song, ...this.state.songs],
        feed: [res.data.song, ...this.state.songs]
      })
      this.getMyProfileSongs()
      this.getAllComments()
      this.getAllSongsWithUsersGenresOrderByFav()
      this.getAllSongsWithUsersGenres()
    })
    .catch(err => {
      console.log(err, "posting music err");
    })
  }

  //this is for posting comments


  handleCommentSubmit = (e) => {
    e.preventDefault()
    this.postNewComment()
  }


  handleFindCommentSongId = (songId) => {
    this.setState({
      song_id: parseInt(songId)
    })
  }
  postNewComment = () => {
    let comment= this.state.comment
    let song_id= this.state.song_id

    axios.post('/songs/comment', {
      song_id: song_id,
      user_id: 1,
      comment: comment
    })
    .then(res => {
      this.setState({
        comments: [res.data.comment, ...this.state.comments],
        comment: ""
      })
      this.getMyProfileSongs()
      this.getAllSongsWithUsersGenresOrderByFav()
      this.getAllSongsWithUsersGenres()
      this.getMyFavSongList()
      this.getAllComments()
    })
    .catch(err => {
      console.log(err, "posting comment err");
    })
  }



  componentDidMount() {
    this.getAllSongsWithUsersGenresOrderByFav()
    this.getAllSongsWithUsersGenres()
    this.getAllProfilesWithFavAmount()
    this.getAllComments()
    this.getAllGenres()
    this.getMyProfileInfo()
    this.getMyProfileSongs()
    this.getMyFavSongList()
    this.getAllFavorites()
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
            song_id={this.state.song_id}
            handleSelect={this.handleSelect}
            toggleFavorite={this.toggleFavorite}
            handleClick={this.handleClick}
            genres={this.state.genres}
            comment={this.state.comment}
            handleFindCommentSongId={this.handleFindCommentSongId}

            title={this.state.title}
            img_url={this.state.img_url}
            songs={this.state.feed}
            genreSelect={this.state.genreSelect}
            myFavorite={this.state.myFavorite}
            myProfile={this.state.myProfile}
            myProfileSongs={this.state.myProfileSongs}
            getMyProfileInfo={this.getMyProfileInfo}
            getMyProfileSongs={this.getMyProfileSongs}
            getMyFavSongList={this.getMyFavSongList}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleCommentSubmit={this.handleCommentSubmit}
            favorites={this.state.likes}

              />}
            />
            <Route exact path="/profile/:id" render={(props) => <User {...props} profiles={this.state.profiles} goBack={this.goBack}
            comments={this.state.comments} favbutton={this.state.favbutton}
            song={this.state.song}
            song_id={this.state.song_id}
            handleSelect={this.handleSelect}
            toggleFavorite={this.toggleFavorite}
            handleClick={this.handleClick}
            genres={this.state.genres}
            comment={this.state.comment}
            handleCommentSubmit={this.handleCommentSubmit}
            handleFindCommentSongId={this.handleFindCommentSongId}
            handleChange={this.handleChange}
            favorites={this.state.likes}
              />}
            />
            <Route exact path="/songs" render={(props) => <Songs {...props} songs={this.state.feed} favbutton={this.state.favbutton} searchByTitle={this.state.searchByTitle}
            song={this.state.song}
            handleChange={this.handleChange} toggleFavorite={this.toggleFavorite} handleSubmit={this.handleSubmit} handleClick={this.handleClick} comments={this.state.comments}
            favorites={this.state.likes}
            comment={this.state.comment}
            song_id={this.state.song_id}
            handleCommentSubmit={this.handleCommentSubmit}
            handleFindCommentSongId={this.handleFindCommentSongId}
              />}
            />
            <Route exact path="/songs/bypop" render={(props) => <ByFav {...props} songs={this.state.songs} favbutton={this.state.favbutton}
            song={this.state.song}
            toggleFavorite={this.toggleFavorite}
            handleClick={this.handleClick}
            song_id={this.state.song_id}
            comments={this.state.comments}
            favorites={this.state.likes}
            comment={this.state.comment}
            handleChange={this.handleChange}
            handleCommentSubmit={this.handleCommentSubmit}
            handleFindCommentSongId={this.handleFindCommentSongId}
              />}
            />
            <Route exact path="/songs/bygen" render={(props) => <ByGen {...props} songs={this.state.songs} favbutton={this.state.favbutton}
            song={this.state.song}
            song_id={this.state.song_id}
            genres={this.state.genres}
            handleSelect={this.handleSelect}
            genreSelect={this.state.genreSelect}
            toggleFavorite={this.toggleFavorite}
            handleClick={this.handleClick}
            handleChange={this.handleChange}
            comments={this.state.comments}
            favorites={this.state.likes}
            comment={this.state.comment}
            handleCommentSubmit={this.handleCommentSubmit}
            handleFindCommentSongId={this.handleFindCommentSongId}
              />}
            />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
