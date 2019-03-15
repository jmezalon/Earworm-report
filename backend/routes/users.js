var express = require('express');
var router = express.Router();
const { getAllUsers, getSingleUser, addUser, deleteUser } = require('../db/queries/userQueries.js')

/* GET users listing. */
router.get('/', getAllUsers);
router.get('/:id', getSingleUser)
router.post('/', addUser);
router.delete('/:id', deleteUser)


module.exports = router;
