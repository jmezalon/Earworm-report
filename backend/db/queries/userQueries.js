const { db } = require('./index.js')

const getAllUsers = (req, res, next) => {
  db.any('SELECT * FROM users')
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


module.exports = { getAllUsers }
