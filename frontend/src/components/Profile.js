import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Profile extends Component {

  state = {

    posted: true,
    favorited: false,
  }





  // handleProfileChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }







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




  render() {
                // if i have more time i'll put both of these in a seperate component to be more organize

    // this is for favorite

    let favoriteDisplay = this.props.myFavorite.map(songs => {
      let displayComment = this.props.comments.map(com => {
        if(com.song_id === songs.song_id) {
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
                    <span data-song_id={songs.song_id} name="favbutton"  onClick={this.props.handleClick} style={{color: "red"}}>
                      <i className={ songs.id === this.props.favbutton && this.props.song.fav ? "far fa-grin-hearts" : "far fa-heart"}></i>
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



    // this is for post

    let postDisplay = this.props.myProfileSongs.map(songs => {
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
                      <i className={ songs.id === this.props.favbutton && this.props.song.fav ? "far fa-grin-hearts" : "far fa-heart"}></i>
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

    let genreSelections = this.props.genres.map(genre => {
      return <option key={genre.id} value={genre.id}>{genre.genre}</option>
    })


    return(
      <div className="myprofile">
        <div>
          {!this.props.myProfile ? <h1>Loading...</h1> : <h1 id="protitle">{this.props.myProfile.username}</h1>}
        </div>


          <div className="postnfav">
            <button onClick={this.toggleButton} className={ this.state.posted ? "on" : "off"}>Posted</button>
            <button onClick={this.toggleButton2} className={this.state.favorited ? "on" : "off"}>Favorited</button>
          </div>

          {
            this.state.posted
            ?
            <div>
              <form onSubmit={this.props.handleSubmit}>
                <div id="pro-newsong">
                  <h4>Add a New Song</h4>
                  <input id="titinput" type="text" name="title" onChange={this.props.handleChange} value={this.props.title} placeholder="add title" />
                  <input id="urlinput" type="text" name="img_url" onChange={this.props.handleChange} value={this.props.img_url} placeholder="add imgage URL" />
                  <select name="genreSelect" id="genselect" value={this.props.genreSelect} onChange={this.props.handleChange}>
                    <option value="clear"> --Select A Genre-- </option>
                    {genreSelections}
                  </select>
                  <button>add</button>
                  <p>{this.props.title}</p>
                  <img id="imgdisp" alt="" src={this.props.img_url} />
                </div>
              </form>
            </div>
            :
            null
          }

          {this.state.posted ? postDisplay : favoriteDisplay}

      </div>
    )
  }
}


export default Profile
