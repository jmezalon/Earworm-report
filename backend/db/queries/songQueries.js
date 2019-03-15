const { db } = require('./index.js');

const getAllSongsWithUsersGenresOrderByFavorite = (req, res, next) => {
  db.any(`SELECT s.*, fv.favorite, g.genre, u.username
          FROM songs AS s
          FULL JOIN genres AS g
          ON s.genre_id = g.id
          FULL JOIN users AS u
          ON s.user_id = u.id
          FULL JOIN
            (SELECT COUNT(song_id) AS favorite, song_id
              FROM favorites
                GROUP BY favorites.song_id) AS fv
          ON fv.song_id = s.id
          ORDER BY fv.favorite
          DESC`)
  .then(songs => {
    res.status(200)
    .json({
      status: 'success',
      songs: songs,
      message: 'this is all the songs'
    })
  })
  .catch(err => next(err));
}

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

const getAllSongsPostByOneUser = (req, res, next) => {
  let userId = req.params.id
  db.any(`SELECT * FROM songs WHERE user_id=$1`, userId)
  .then( songs => {
    res.status(200)
    .json({
      status: 'success',
      songs: songs,
      message: 'this is all the songs posted by that user'
    })
  })
  .catch(err => next(err));
}


const getOneSong = (req, res, next) => {
  let songId = req.params.id
  db.one(`SELECT * FROM songs WHERE id=$1`, songId)
  .then(song => {
    res.status(200)
    .json({
      status: 'success',
      song: song,
      message: 'this is one song'
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

const postSong = (req, res, next) => {
  db.one('INSERT INTO songs(title, img_url, user_id, genre_id) VALUES(${title}, ${img_url}, ${user_id}, ${genre_id}) RETURNING *', req.body)
  .then((song) => {
    res.status(200)
    .json({
      status: 'success',
      song: song,
      message: 'you added a new song'
    })
  })
  .catch(err => next(err));
}

const deleteSong = (req, res, next) => {
  let songId = parseInt(req.params.id);
  db.result('DELETE FROM songs WHERE id=$1', songId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this song',
      body: result
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


module.exports = { getAllSongsWithUsersGenresOrderByFavorite, getAllSongsBySpecificGenre, getAllSongsPostByOneUser, getOneSong, getAllGenres, postSong, postGenre, deleteSong, deleteGenre }
