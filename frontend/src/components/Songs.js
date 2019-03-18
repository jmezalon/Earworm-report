import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Songs extends React.Component {
  state = {
    searchByTitle: "",
    favbutton: "",
    song: {
        fav: false
      }
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  toggleFavorite=(id) => {
    console.log(this.state.favbutton, "FAVBUTTON");
    let newfavid= parseInt(this.state.song.id)
    if (this.state.song.fav && id === newfavid) {
      this.setState({
        favbutton: newfavid
      })
    }
  }

  handleClick =  (e) => {
     const selectedSong = this.props.songs.find(song => {
        return song.id === parseInt(e.currentTarget.dataset.song_id)
      })
      let favbuttons= {fav: !this.state.song.fav}
      let newSong
      if(selectedSong){
        newSong = Object.assign(this.state.song, selectedSong)
        if (selectedSong.id === parseInt(e.currentTarget.dataset.song_id)){
          this.setState({
            song: Object.assign(newSong, favbuttons),

          })
          this.toggleFavorite(parseInt(e.currentTarget.dataset.song_id))
        }
      }
  }

  //fav button needs to change to unfavorite

//need to make post request and patch request
  // componentDidMount() {
  // }

  render() {

    let filteredSongs = this.props.songs.filter(song => {
      return song.title.toLowerCase().includes(this.state.searchByTitle.toLowerCase())
    })


    let songDisplay = filteredSongs.map(song => {
      let displayComment = this.props.comments.map(com => {
        if(com.song_id === song.id) {
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

        <div key={song.id} className="songdisplay">

            <div >
              <img className="songimg" alt="" src={song.img_url} />
            </div>
            <div>
              <section className="spansec">
                <span className="spantitle">{song.title}
                  <section id="pfav">
                    <p id="pfav2">{song.favorite} favorites</p>
                    <span data-song_id={song.id} name="favbutton"  onClick={this.handleClick} style={{color: "red"}}>
                      <i className={ song.id === this.state.favbutton && this.state.song.fav ? "far fa-grin-hearts" : "far fa-heart"}></i>
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
                    <Link to={`/profile/${song.user_id}`}><p id="userp">posted by: {song.username}</p></Link>
                  </section>
              </section>
            </div>
        </div>
      )
    })




    return (
      <div className="songsNprofile">
        <div className="searchbar">
          <form className="songForm" onSubmit={this.handleSubmit}>
              <label htmlFor="searchByTitle">Search By Title </label>
              <div>
                <input type="text" id="searchinput" name="searchByTitle" placeholder="Search" value={this.state.searchByTitle} onChange={this.handleChange} />

                  <button id="searchbutt">Search</button>
                </div>
              </form>
        </div>

            {(this.state.searchByTitle).includes(songDisplay) === true ? <h1>NOT FOUND</h1> : songDisplay}


      </div>
    )
  }
}



export default Songs
