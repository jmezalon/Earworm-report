const { db } = require('./index.js');


const getAllSongsWithUsersGenresOrderByFavorite = (req, res, next) => {
  db.any(`SELECT s.*, COALESCE(fv.favorite, 0) as favorite, cm.comment AS comment, g.genre, u.username
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

          FULL JOIN
            (SELECT COUNT(song_id) AS comment, song_id
              FROM comments
                GROUP BY comments.song_id) AS cm
          ON cm.song_id = s.id

          ORDER BY COALESCE(fv.favorite, 0)
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



const getAllFavorites = (req, res, next) => {
  db.any('SELECT * FROM favorites')
  .then(fav => {
    res.status(200)
    .json({
      status: 'success',
      favorites: fav,
      message: 'this is all the favorites'
    })
  })
  .catch(err => next(err));
}


const getAllFavsForSpecificSong = (req, res, next) => {
  let songId = req.params.id
  db.any(`SELECT f.id, f.user_id AS fav_id, u.username
          FROM favorites AS f
          FULL JOIN users AS u
          ON f.user_id = u.id
          WHERE f.song_id=$1`, songId)
  .then(favorites => {
    res.status(200)
    .json({
      status: 'success',
      favorites: favorites,
      message: 'this is all favorites for this song'
    })
  })
  .catch(err => next(err));
}



const addFavorite = (req, res, next) => {
  db.one('INSERT INTO favorites(user_id, song_id) VALUES(${user_id}, ${song_id}) RETURNING *', req.body)
  .then((favorite) => {
    res.status(200)
    .json({
      status: 'success',
      favorite: favorite,
      message: 'you added a new favorite'
    })
  })
  .catch(err => next(err));
}


const deleteFavorite = (req, res, next) => {
  let favoriteId = parseInt(req.params.id);
  db.result('DELETE FROM favorites WHERE id=$1', favoriteId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this favorite',
      result: result
    })
  })
  .catch(err => next(err));
}


const getAllFavsForSpecificUser = (req, res, next) => {
  let userId = req.params.id
  db.any(`SELECT f.id, f.song_id, u.id AS user_id, s.title, cm.comment as comment, s.img_url,  fv.favorite, g.genre
            FROM favorites AS f
            FULL JOIN users as u
              on f.user_id = u.id
              FULL JOIN songs AS s
              ON f.song_id = s.id
                FULL JOIN
                  (SELECT COUNT(song_id) AS favorite, song_id
                    FROM favorites
                      GROUP BY favorites.song_id) AS fv
          ON fv.song_id = s.id

          FULL JOIN
          (SELECT COUNT(song_id) AS comment, song_id
              FROM comments
                GROUP BY comments.song_id) AS cm
          ON cm.song_id = s.id

          FULL JOIN genres AS g
            ON s.genre_id = g.id
            WHERE f.user_id =$1
            ORDER BY f.id
                DESC`, userId)
  .then(favorites => {
    res.status(200)
    .json({
      status: 'success',
      favorites: favorites,
      message: 'this is all favorites for this User'
    })
  })
  .catch(err => next(err));
}


module.exports = { getAllSongsWithUsersGenresOrderByFavorite, getAllFavsForSpecificUser, addFavorite, deleteFavorite, getAllFavorites, getAllFavsForSpecificSong }
