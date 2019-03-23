const { db } = require('./index.js');


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


module.exports = { getAllComments, getAllCommentsForSpecificSong, updateComment, deleteComment, postComment }
