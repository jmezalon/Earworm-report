var express = require('express');
var router = express.Router();
const { getAllUsers } = require('../db/queries/userQueries.js')

/* GET users listing. */
router.get('/', getAllUsers);


module.exports = router;
