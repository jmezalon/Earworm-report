const express = require('express');
const router = express.Router();

const { getAllSongsWithUsersGenres, getAllSongsPostByOneUser, getOneSong, postSong, deleteSong } = require('../db/queries/songQueries.js');

router.get('/', getAllSongsWithUsersGenres);
router.get('/user/:id', getAllSongsPostByOneUser);
router.get('/:id', getOneSong);
router.post('/', postSong);
router.delete('/:id', deleteSong);



module.exports = router;
