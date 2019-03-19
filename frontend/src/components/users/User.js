import React from 'react';
import axios from 'axios';
import { UserDisplay } from './UserDisplay.js'
import { withRouter, Link } from 'react-router-dom'


class User extends React.Component {
  state = {
    user: [],
    posted: true,
    favorited: false,
  }


  toggleButton = (e) => {
    e.preventDefault()
    this.setState({
      posted: true,
      favorited: false
    })
  }

  toggleButton2 = (e) => {
    e.preventDefault()
    this.setState({
      posted: false,
      favorited: true
    })
  }



  getSingleUser() {
    let userId = parseInt(this.props.match.params.id)
    axios.get(`/profile/${userId}`)
    .then(res => {
      this.setState({
        user: res.data.user
      })
    })
    .catch(err => {
      console.log(err, "single USER call");
    })
  }

  componentDidMount() {
    this.getSingleUser()
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
        handleClick={this.props.handleClick} />


      </div>
    )
  }
}


export default withRouter(User)
