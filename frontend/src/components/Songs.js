import React from 'react';
import { Link } from 'react-router-dom';


class Songs extends React.Component {

  //fav button needs to change to unfavorite

//need to make post request and patch request
  // componentDidMount() {
  // }

  render() {

    let filteredSongs = this.props.songs.filter(song => {
      return song.title.toLowerCase().includes(this.props.searchByTitle.toLowerCase())
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
                    <span data-song_id={song.id} name="favbutton"  onClick={this.props.handleClick} style={{color: "red"}}>
                      <i className={ song.id === this.props.favbutton && this.props.song.fav ? "far fa-grin-hearts" : "far fa-heart"}></i>
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
          <form className="songForm" onSubmit={this.props.handleSubmit}>
              <label htmlFor="searchByTitle">Search By Title </label>
              <div>
                <input type="text" id="searchinput" name="searchByTitle" placeholder="Search" value={this.props.searchByTitle} onChange={this.props.handleChange} />

                  <button id="searchbutt">Search</button>
                </div>
              </form>
        </div>

            {(this.props.searchByTitle).includes(songDisplay) === true ? <h1>NOT FOUND</h1> : songDisplay}


      </div>
    )
  }
}



export default Songs
