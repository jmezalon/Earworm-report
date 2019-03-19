import React from 'react';


export const UserDisplay = () => {

/*
  //post display
  let postDisplay = this.props.myProfileSongs.map(songs => {
    let displayComment = this.props.comments.map(com => {
      if(com.song_id === songs.id) {
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



  // favorite display
  let favoriteDisplay = this.props.myFavorite.map(songs => {
    let displayComment = this.props.comments.map(com => {
      if(com.song_id === songs.song_id) {
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

*/

  return (
    <div className="userprofile">

      am I working?

    </div>
  )
}
