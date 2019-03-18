import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Profile extends Component {
  state = {
    myProfile: "",
    myProfileComments: [],
    myProfileSongs: [],
    posted: true,
    favorited: false
  }

  // myProfileComments = () => {
  //   axios.get("/songs/comments/1")
  //   .then(res => {
  //     this.setState({
  //       myProfileComments: res.data.comments
  //     })
  //   }).catch(err => {
  //     console.log(err, "myProfile comment ERR");
  //   })
  // }

  myProfileInfo = () => {
    axios.get("/profile/1")
    .then(res => {
      this.setState({
        myProfile: res.data.user
      })
    }).catch(err => {
      console.log(err, "myProfileERR");
    })
  }

  myProfileSongs = () => {
    axios.get("/songs/user/1")
    .then(res => {
      this.setState({
        myProfileSongs: res.data.songs
      })
    }).catch(err => {
      console.log(err, "myProfile Song ERR");
    })
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

  componentDidMount() {
    this.myProfileInfo()
    this.myProfileSongs()
    // this.myProfileComments()
  }


  render() {

    let postDisplay = this.state.myProfileSongs.map(songs => {
      let displayComment = this.props.comments.map(com => {
        if(com.song_id === songs.id) {
          return (
            <div key={com.id}>
              <li>{com.comment}</li>
                <ol>
                  <Link to={`/profile/${com.user_id}`}><li id="olli">{com.username}</li></Link>
                </ol>
              <hr />
            </div>
          )
        } else {
          return null
        }
      })
      return (

        <div key={songs.id} className="songdisplay">

            <div >
              <img className="songimg" alt="" src={songs.img_url} />
            </div>
            <div>
              <section className="spansec">
                <span className="spantitle">{songs.title}
                  <section id="pfav">
                    <p id="pfav2">{songs.favorite} favorites</p>
                    <span data-song_id={songs.id} name="favbutton"  onClick={this.props.handleClick} style={{color: "red"}}>
                      <i className={ songs.id === this.props.favbutton && this.props.songs.fav ? "far fa-grin-hearts" : "far fa-heart"}></i>
                      </span>
                  </section>
                </span>
                <section id="comment">
                  <ul>{displayComment}</ul>
                </section>
                  <section id="addcomment">
                    <form>
                      <input id="cominpt" type="text" />
                      <button>Add comment</button>
                    </form>
                    
                  </section>
              </section>
            </div>
        </div>
      )
    })



    return(
      <div className="myprofile">
        <div>
          {!this.state.myProfile ? <h1>Loading...</h1> : <h1>{this.state.myProfile.username}</h1>}
        </div>

        <form>
          <div className="postnfav">
            <button onClick={this.toggleButton} className={ this.state.posted ? "on" : "off"}>Posted</button>
            <button onClick={this.toggleButton2} className={this.state.favorited ? "on" : "off"}>Favorited</button>
          </div>
        </form>

          {postDisplay}

      </div>
    )
  }
}


export default Profile
