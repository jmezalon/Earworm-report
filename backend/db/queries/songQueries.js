const { db } = require('./index.js');



const getAllSongsWithUsersGenres = (req, res, next) => {
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


          ORDER BY s.id
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



const getAllSongsPostByOneUser = (req, res, next) => {
  let userId = req.params.id
  db.any(`SELECT s.id, u.id AS user_id, s.title, cm.comment AS comment, s.genre_id, s.img_url,
            fv.favorite
              FROM songs AS s
                JOIN users AS u
                ON
                s.user_id = u.id
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

WHERE user_id=$1
ORDER BY s.id
DESC`, userId)
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
  db.one(`SELECT s.*, cm.comment AS comment
FROM songs AS s
FULL JOIN
(SELECT COUNT(song_id) AS comment, song_id
    FROM comments
      GROUP BY comments.song_id) AS cm
ON cm.song_id = s.id
WHERE id=$1`, songId)
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





module.exports = { getAllSongsWithUsersGenres, getAllSongsPostByOneUser, getOneSong, postSong, deleteSong }
