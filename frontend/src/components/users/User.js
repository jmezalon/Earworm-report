import React from 'react';
import axios from 'axios';
import  UserDisplay  from './UserDisplay.js'
import { withRouter, Redirect, Link } from 'react-router-dom'


class User extends React.Component {
  _isMounted = false;
  state = {
    user: [],
    userFav: [],
    userSongs:[],
    posted: true,
    favorited: false,
  }


  //user get request

  getUserFavSongList = (id) => {
    // let userId = parseInt(this.props.match.params.id)
    axios.get(`/profile/bypop/${id}`)
    .then(res => {
      this.setState({
        userFav: res.data.favorites
      })
    }).catch(err => {
      console.log(err, "myProfile song list ERR");
    })
  }

  getUserSongs = (id) => {
    // let userId = parseInt(this.props.match.params.id)
    axios.get(`/songs/user/${id}`)
    .then(res => {
      this.setState({
        userSongs: res.data.songs
      })
    }).catch(err => {
      console.log(err, "myProfile Song ERR");
    })
  }

  // getSingleUser(id) {
  //   let userId = parseInt(this.props.match.params.id)
  //   axios.get(`/profile/${id}`)
  //   .then(res => {
  //     this.setState({
  //       user: [res.data.user]
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err, "single USER call");
  //   })
  // }


  // toggle post and favorite buttons

  toggleButton = () => {
    this.setState({
      posted: true,
      favorited: false
    })
  }

  toggleButton2 = () => {
    this.setState({
      posted: false,
      favorited: true
    })
  }

  // this.getSingleUser(parseInt(this.props.match.params.id))

  handleCommentClick = async () => {

      await this.toggleButton()
      this.getUserSongs(parseInt(this.props.match.params.id))
      this.getUserFavSongList(parseInt(this.props.match.params.id))

  }



  componentDidMount() {
    this._isMounted = true;
    // this.getSingleUser(parseInt(this.props.match.params.id))
    if (parseInt(this.props.match.params.id)) {
      this.getUserSongs(parseInt(this.props.match.params.id))
      this.getUserFavSongList(parseInt(this.props.match.params.id))
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log(this.props.match.params.id);
    let userProfile;
    if (this.props.profiles) {
      userProfile = this.props.profiles.filter(profile => {
        return parseInt(profile.id) === parseInt(this.props.match.params.id)
      })
    }

    let profileDisplay = userProfile.map(user => {
      return <h1 id="protitle" key={user.id}>{user.username}</h1>
    })

    return (
      <div className="songsNprofile">
        <div className="backbutton">
          <Link to="#" onClick={this.props.goBack}><p>Go back</p></Link>
        </div>
        {parseInt(this.props.match.params.id) === 1 ? <Redirect to="/profile" /> :""}
        <div className="username">
          {!this.props.profiles ? <h1>Loading...</h1> : profileDisplay}
        </div>

        <div className="postnfav">
          <button onClick={this.toggleButton} className={ this.state.posted ? "on" : "off"}>Posted</button>
          <button onClick={this.toggleButton2} className={this.state.favorited ? "on" : "off"}>Favorited</button>
        </div>

        <UserDisplay
        comments={this.props.comments}
        favbutton={this.props.favbutton}
        song={this.props.song}
        genres={this.props.genres}
        handleSelect={this.props.handleSelect}
        toggleFavorite={this.props.toggleFavorite}
        handleClick={this.props.handleClick}
        handleCommentClick={this.handleCommentClick}

        userFav={this.state.userFav}
        userSongs={this.state.userSongs}

        posted={this.state.posted}
        favorited={this.state.favorited}

        />


      </div>
    )
  }
}


export default withRouter(User)
