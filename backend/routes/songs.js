const express = require('express');
const router = express.Router();

const { getAllSongsWithUsersGenresOrderByFavorite, getAllSongsBySpecificGenre, getAllSongsPostByOneUser, getOneSong, getAllGenres, postSong, postGenre, deleteSong, deleteGenre } = require('../db/queries/songQueries.js');


router.get('/', getAllSongsWithUsersGenresOrderByFavorite);
router.get('/bypop', getAllGenres);
router.post('/bypop', postGenre);
router.delete('/bypop/:id', deleteGenre);
router.get('/genre/:id', getAllSongsBySpecificGenre);
router.get('/user/:id', getAllSongsPostByOneUser);
router.get('/:id', getOneSong);
router.post('/', postSong);
router.delete('/:id', deleteSong);



module.exports = router;
