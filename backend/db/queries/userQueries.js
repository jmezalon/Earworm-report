const { db } = require('./index.js');

const getAllUsers = (req, res, next) => {
  db.any(`SELECT u.*, fv.favorite
FROM users AS u


FULL JOIN
        (SELECT COUNT(user_id) AS favorite, user_id
            FROM favorites
                GROUP BY favorites.user_id
                    ) AS fv
ON fv.user_id = u.id
ORDER BY fv.favorite
DESC`)
  .then(users => {
    res.status(200)
    .json({
      status: 'succes',
      users: users,
      message: 'this is all the users'
    })
  })
  .catch(err => next(err));
}


const getSingleUser = (req, res, next) => {
  let userId = req.params.id
  db.one(`SELECT * FROM users WHERE id=$1`, userId)
  .then(user => {
    res.status(200)
    .json({
      status: 'success',
      user: user,
      message: 'this is one user'
    })
  })
  .catch(err => next(err));
}


const addUser = (req, res, next) => {
  db.one('INSERT INTO users(username) VALUES(${username}) RETURNING *', req.body)
  .then((user) => {
    res.status(200)
    .json({
      status: 'success',
      user: user,
      message: 'you added a new user'
    })
  })
  .catch(err => next(err));
}


const deleteUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result('DELETE FROM users WHERE id=$1', userId)
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'you removed this user',
      result: result
    })
  })
  .catch(err => next(err));
}


const getAllFavsForSpecificUser = (req, res, next) => {
  let userId = req.params.id
  db.any(`SELECT f.id, f.song_id, s.title, s.img_url
          FROM favorites AS f
          FULL JOIN songs AS s
          ON f.song_id = s.id
          WHERE f.user_id = $1`, userId)
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



module.exports = { getAllUsers, getAllFavsForSpecificUser, getSingleUser, addUser, deleteUser }
