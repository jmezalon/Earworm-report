var express = require('express');
var router = express.Router();
const { getAllUsers, getAllFavsForSpecificUser, getSingleUser, addUser, deleteUser } = require('../db/queries/userQueries.js')

/* GET users listing. */
router.get('/', getAllUsers);
router.get('/bypop/:id', getAllFavsForSpecificUser)
router.get('/:id', getSingleUser)
router.post('/', addUser);
router.delete('/:id', deleteUser)


module.exports = router;
