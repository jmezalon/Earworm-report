import React from 'react';
import axios from 'axios';
import  UserDisplay  from './UserDisplay.js'
import { withRouter, Redirect, Link } from 'react-router-dom'


class User extends React.Component {
  state = {
    userFav: [],
    userSongs:[],
    id: "",
    posted2: true,
    favorited2: false,
  }


  //user get request

  getUserFavSongList = (id) => {
    // let userId = parseInt(this.props.match.params.id)
    if(parseInt(id) !== 1) {
      axios.get(`/profile/bypop/${id}`)
      .then(res => {
          this.setState({
            userFav: res.data.favorites
          })
      }).catch(err => {
        console.log(err, "myProfile song list ERR");
      })
    }
  }

  getUserSongs = (id) => {
    // let userId = parseInt(this.props.match.params.id)
    if (parseInt(id) !== 1) {
      axios.get(`/songs/user/${id}`)
      .then(res => {
          this.setState({
            userSongs: res.data.songs
          })
      }).catch(err => {
        console.log(err, "myProfile Song ERR");
      })
    }
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

  toggleButton4 = () => {
    this.setState({
      posted2: true,
      favorited2: false
    })
  }

  toggleButton3 = () => {
    this.setState({
      posted2: false,
      favorited2: true
    })
  }

  // this.getSingleUser(parseInt(this.props.match.params.id))

  handleCommentClick = async () => {

        await this.toggleButton4()

        this.getUserSongs(parseInt(this.props.match.params.id))
        this.getUserFavSongList(parseInt(this.props.match.params.id))

  }

  handleSingleUserInfo = async () => {
    await this.setState({
      id: parseInt(this.props.match.params.id)
    })
    if (this.state.id !== 1) {
      this.getUserSongs(this.state.id)
      this.getUserFavSongList(this.state.id)
    } else {
      return null
    }
  }



  componentDidMount() {
    // this.getSingleUser(parseInt(this.props.match.params.id))
    if (parseInt(this.props.match.params.id) !== 1) {
      this.getUserSongs(parseInt(this.props.match.params.id))
      this.getUserFavSongList(parseInt(this.props.match.params.id))
    } else {
      return null
    }
  }


  render() {
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
        {parseInt(this.props.match.params.id) === 1 ? <Redirect to="/profile" /> : null}
        <div className="username">
          {!this.state.userSongs.length ? <h1>Loading...</h1> : profileDisplay}
        </div>

        <div className="postnfav">
          <button onClick={this.toggleButton4} className={ this.state.posted2 ? "on" : "off"}>posted</button>
          <button onClick={this.toggleButton3} className={this.state.favorited2 ? "on" : "off"}>favorited</button>
        </div>

        <UserDisplay
        handleSingleUserInfo={this.handleSingleUserInfo}
        comments={this.props.comments}
        favbutton={this.props.favbutton}
        song={this.props.song}
        genres={this.props.genres}
        handleSelect={this.props.handleSelect}
        toggleFavorite={this.props.toggleFavorite}
        handleClick={this.props.handleClick}
        handleCommentClick={this.handleCommentClick}

        handleFindCommentSongId={this.props.handleFindCommentSongId}
        comment={this.props.comment}
        handleChange={this.props.handleChange}
        handleCommentSubmit={this.props.handleCommentSubmit}
        song_id={this.props.song_id}

        userFav={this.state.userFav}
        userSongs={this.state.userSongs}
        favorites={this.props.favorites}
        posted2={this.state.posted2}

        />


      </div>
    )
  }
}


export default withRouter(User)
