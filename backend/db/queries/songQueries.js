const { db } = require('./index.js');

const getAllSongsWithFav = (req, res, next) => {
  db.any(`SELECT s.*, fv.total_fav
          FROM songs AS s
          FULL JOIN
            (SELECT COUNT(song_id) AS total_fav, song_id
              FROM favorites
                GROUP BY favorites.song_id) AS fv
          ON fv.song_id = s.id
          ORDER BY fv.total_fav
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


module.exports = { getAllSongsWithFav }
