import React from 'react';
import { Link } from "react-router-dom";


export const ByGen = ({ songs, comments, favbutton, song, toggleFavorite, handleClick, favorites, genres, genreSelect, handleSelect, handleCommentSubmit, handleFindCommentSongId, comment, handleChange, song_id }) => {





  let genreSelections = genres.map(genre => {
    return <option key={genre.id} value={genre.id}>{genre.genre}</option>
  })

  // let filteredSongs;
  // if (songs) {
  //
  //   filteredSongs = songs.filter(song => {
  //     return song.genre_id === genreSelect
  //   })
  // }

  // let favbutton = favorites.filter(fav => {
  //   return fav.fav === true
  // })
  let filteredSongs = songs.filter(asong => asong.genre_id === parseInt(genreSelect))

  let songDisplay
  if (filteredSongs) {
    songDisplay = filteredSongs.map(song => {
      let favUserId = favorites.find(id => id.song_id === song.id)
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
                      <i className={ favUserId ? "far fa-grin-hearts" : "far fa-heart"}></i>
                      </span>
                  </section>
                </span>
                <section id="comment">
                  <ul>{!song.comment ? <p id="firstcomdisplay">be the first to post a comment</p> : displayComment}</ul>
                </section>
                  <section id="addcomment">
                    <form onSubmit={handleCommentSubmit}>
                      <span onClick={() => handleFindCommentSongId(song.id)}>
                        <input id="cominpt" name="comment"  value={song.id === song_id ? comment : ""} onChange={handleChange} type="text" />
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

  }


  let allSongs = songs.map(song => {
    let favUserId = favorites.find(id => id.song_id === song.id)
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
                    <i className={ favUserId ? "far fa-grin-hearts" : "far fa-heart"}></i>
                    </span>
                </section>
              </span>
              <section id="comment">
                <ul>{!song.comment ? <p id="firstcomdisplay">be the first to post a comment</p> : displayComment}</ul>
              </section>
                <section id="addcomment">
                  <form onSubmit={handleCommentSubmit}>
                    <span onClick={() => handleFindCommentSongId(song.id)}>
                      <input id="cominpt" name="comment"  value={song.id === song_id ? comment : ""} onChange={handleChange} type="text" />
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
      <div className="fenform">
          <form>
          <select name="genreSelect" id="genselect" value={genreSelect} onChange={handleSelect}>
            <option value=""> --Select A Genre-- </option>
            {genreSelections}
          </select>
          </form>
        </div>
        { !songs.length ? <h1>LOADING...</h1> : ""}
        { genreSelect=== "" ? allSongs : songDisplay}
    </div>
  )
}
