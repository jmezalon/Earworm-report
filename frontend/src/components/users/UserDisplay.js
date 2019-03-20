import React from 'react';
import { Link, withRouter } from "react-router-dom";


export const UserDisplay = ({ posted2, handleCommentClick, userSongs, userFav, comments, handleClick, favbutton, song }) => {


  //post display
  let postDisplay = userSongs.map(songs => {
    let displayComment = comments.map(com => {
      if(com.song_id === songs.id) {
        return (
          <div key={com.id}>
            <li>{com.comment}</li>
              <ol>
                <Link onClick={handleCommentClick} to={`/profile/${com.user_id}`}><li id="olli">{com.username}</li></Link>
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
                  <span data-song_id={songs.id} name="favbutton"  onClick={handleClick} style={{color: "red"}}>
                    <i className={ songs.id === favbutton && song.fav ? "far fa-grin-hearts" : "far fa-heart"}></i>
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

  // favorite display

  let favoritedDisplay = userFav.map(songs => {
    let displayComment = comments.map(com => {
      if(com.song_id === songs.song_id) {
        return (
          <div key={com.id}>
            <li>{com.comment}</li>
              <ol>
                <Link onClick={handleCommentClick} to={`/profile/${com.user_id}`}><li id="olli">{com.username}</li></Link>
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
                  <span data-song_id={songs.song_id} name="favbutton"  onClick={handleClick} style={{color: "red"}}>
                    <i className={ songs.id === favbutton && song.fav ? "far fa-grin-hearts" : "far fa-heart"}></i>
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



  return (
    <div className="userprofile">

      {posted2 ? postDisplay : favoritedDisplay}

    </div>
  )
}

export default withRouter(UserDisplay)
