const { db } = require('./index.js');

const getAllSongsWithUsersGenresOrderByFavorite = (req, res, next) => {
  db.any(`SELECT s.*, fv.favorite, g.genre, u.username, the_comments.all_comments
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
                (SELECT ARRAY_AGG(DISTINCT comments.comment) AS all_comments, song_id
                    FROM comments
                        GROUP BY comments.song_id) AS the_comments
                        ON
                        the_comments.song_id = s.id
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
  db.any(`SELECT s.id, s.title, s.genre_id, s.img_url,
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

WHERE user_id=$1`, userId)
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
  db.one(`SELECT s.*, the_comments.all_comments
FROM songs AS s
FULL JOIN
    (SELECT ARRAY_AGG(DISTINCT comments.comment) AS all_comments, song_id
        FROM comments
            GROUP BY comments.song_id) AS the_comments
ON
the_comments.song_id = s.id
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

/////////////////// favorite queries

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
  db.any(`SELECT f.id, u.id, u.username
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


////////////comments queries

const getAllComments = (req, res, next) => {
  db.any(`SELECT c.*, u.username, fv.favorite
            FROM comments AS c
              JOIN users AS u
              ON c.user_id = u.id
            FULL JOIN
              (SELECT COUNT(user_id) AS favorite, user_id
                FROM favorites
                  GROUP BY favorites.user_id) AS fv
            ON fv.user_id = u.id`)
  .then(comments => {
    res.status(200)
    .json({
      status: 'success',
      comments: comments,
      message: 'this is all the comments'
    })
  })
  .catch(err => next(err));

}


const getAllCommentsForSpecificSong = (req, res, next) => {
  let songId = req.params.id
  db.any(`SELECT c.*, u.username, fv.favorite
            FROM comments AS c
                JOIN users AS u
                  ON c.user_id = u.id
            FULL JOIN
              (SELECT COUNT(user_id) AS favorite, user_id
                FROM favorites
                  GROUP BY favorites.user_id) AS fv
            ON fv.user_id = u.id
          WHERE song_id=$1`, songId)
  .then(comments => {
    res.status(200)
    .json({
      status: 'success',
      comments: comments,
      message: 'this is all comments for this song'
    })
  })
  .catch(err => next(err));
}

const updateComment = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ")
  db.none(
      "UPDATE comments SET " + queryString + " WHERE id=" + req.params.id, req.body
    )
    .then(() => {
      res.status(200)
      .json({
        status: "success",
        message: "you updated a comment!"
      });
    })
    .catch(err => next(err));
};


const deleteComment = (req, res, next) => {
  let commentId = parseInt(req.params.id);
  db.result('DELETE FROM comments WHERE id=$1', commentId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this comment',
      result: result
    })
  })
  .catch(err => next(err));
}

const postComment = (req, res, next) => {
  db.one('INSERT INTO comments (comment, user_id, song_id) VALUES(${comment}, ${user_id}, ${song_id}) RETURNING *', req.body)
  .then((comment) => {
    res.status(200)
    .json({
      status: 'success',
      comment: comment,
      message: 'you added a new comment'
    })
  })
  .catch(err => next(err));
}



module.exports = { getAllSongsWithUsersGenresOrderByFavorite, getAllSongsBySpecificGenre, getAllSongsPostByOneUser, getOneSong, getAllGenres, postSong, postGenre, deleteSong, deleteGenre, getAllFavorites, getAllFavsForSpecificSong, addFavorite, deleteFavorite, getAllComments, getAllCommentsForSpecificSong, updateComment, deleteComment, postComment }
