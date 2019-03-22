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
      let favUserId = this.props.favorites.find(id => id.song_id === song.id)
      let displayComment = this.props.comments.map(com => {
        if(com.song_id === song.id) {
          return (
            <div key={com.id}>
              <li>{com.comment}</li>
                <ol>
                  <Link to={com.user_id === 1 ? `/profile` : `/profile/${com.user_id}`}><li id="olli">{com.username}</li></Link>
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
                    <span data-song_id={song.id} name="favbutton"  onClick={() => this.props.handleClick(song.id)} style={{color: "red"}}>
                      <i className={ favUserId ? "far fa-grin-hearts" : "far fa-heart"}></i>
                      </span>
                  </section>
                </span>
                <section id="comment">
                  <ul>{!song.comment ? <p id="firstcomdisplay">be the first to post a comment</p> : displayComment}</ul>
                </section>
                  <section id="addcomment">
                    <form onSubmit={this.props.handleCommentSubmit}>
                      <span onClick={() => this.props.handleFindCommentSongId(song.id)}>
                        <input id="cominpt" name="comment"  value={song.id === this.props.song_id ? this.props.comment : ""} onChange={this.props.handleChange} type="text" />
                        </span>
                        <button>Add comment</button>
                    </form>
                    <Link to={song.user_id === 1 ? `/profile` :`/profile/${song.user_id}`}><p id="userp">posted by: {song.username}</p></Link>
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

            {(this.props.searchByTitle).includes(songDisplay) === true ? <h1>LOADING...</h1> : songDisplay}


      </div>
    )
  }
}



export default Songs
