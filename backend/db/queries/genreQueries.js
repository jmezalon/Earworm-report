const { db } = require('./index.js');

const getAllSongsBySpecificGenre = (req, res, next) => {
  let genreId = req.params.id
  db.any(`SELECT songs.id, songs.title, songs.img_url, songs.user_id FROM songs WHERE genre_id=$1`, genreId)
  .then( songs => {
    res.status(200)
    .json({
      status: 'success',
      songs: songs,
      message: 'this is all the songs from that genre'
    })
  })
  .catch(err => next(err));
}


const getAllGenres = (req, res, next) => {
  db.any(`SELECT * FROM genres`)
  .then(genres => {
    res.status(200)
    .json({
      status: 'success',
      genres: genres,
      message: 'this is all the genres'
    })
  })
  .catch(err => next(err));

}

const postGenre = (req, res, next) => {
  db.one('INSERT INTO genres(genre) VALUES(${genre}) RETURNING *', req.body)
  .then((genre) => {
    res.status(200)
    .json({
      status: 'success',
      genre: genre,
      message: 'you added a new genre'
    })
  })
  .catch(err => next(err));
}


const deleteGenre = (req, res, next) => {
  let genreId = parseInt(req.params.id);
  db.result('DELETE FROM genres WHERE id=$1', genreId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this genre',
      result: result
    })
  })
  .catch(err => next(err));
}


module.exports = { getAllSongsBySpecificGenre, getAllGenres, postGenre, deleteGenre }
