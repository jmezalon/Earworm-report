import React from 'react';
import { Link } from 'react-router-dom'


export const ByFav = ({ songs, comments, favbutton, song, toggleFavorite, handleClick, favorites }) => {

// let favbutton;

  // if (favorites) {
  //
  //   favbutton = favorites.find(fav => {
  //     return fav.fav === true
  //   })
  // }
  let songDisplay;
  if (songs) {
     songDisplay = songs.map(song => {
      let displayComment = comments.map(com => {
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
                    <span data-song_id={song.id} name="favbutton"  onClick={() => handleClick(song.id)} style={{color: "red"}}>
                      <i className={ song.id ? "far fa-grin-hearts" : "far fa-heart"}></i>
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
                    <Link to={song.user_id === 1 ? `/profile` :`/profile/${song.user_id}`}><p id="userp">posted by: {song.username}</p></Link>
                  </section>
              </section>
            </div>
        </div>
      )
    })

  }


  return (
    <div className="songsNprofile">
      {!songs.length ? <h1>LOADING...</h1> : songDisplay}
    </div>
  )
}
