const express = require('express');
const router = express.Router();

const { getAllSongsWithFav } = require('../db/queries/songQueries.js');


router.get('/', getAllSongsWithFav);



module.exports = router;
