import React from 'react';


class Songs extends React.Component {
  state = {
    searchByTitle: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }



  render() {

    let filteredSongs = this.props.songs.filter(song => {
      return song.title.toLowerCase().includes(this.state.searchByTitle.toLowerCase())
    })

    let songDisplay = filteredSongs.map(song => {
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
                    <button>favorite</button>
                  </section>
                </span>
                <section id="comment">
                  <p>where will this go</p>
                  <hr />
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

    // <div>
    //
    //
    //     </div>
    //     <br/>
    //       <div className="songlist">
    //         {}
    //       </div>




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
