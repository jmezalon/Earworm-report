const express = require('express');
const router = express.Router();

const { getAllSongsWithUsersGenresOrderByFavorite, getAllSongsBySpecificGenre, getAllFavorites, getAllFavsForSpecificSong, getAllSongsPostByOneUser, getOneSong, getAllGenres, postSong, postGenre, deleteSong, deleteGenre, addFavorite, deleteFavorite } = require('../db/queries/songQueries.js');


router.get('/', getAllSongsWithUsersGenresOrderByFavorite);
router.get('/bygen', getAllGenres);
router.post('/bygen', postGenre);
router.delete('/bygen/:id', deleteGenre);
router.get('/bypop', getAllFavorites);
router.post('/bypop', addFavorite);
router.delete('/bypop/:id', deleteFavorite);
router.get('/bypop/:id', getAllFavsForSpecificSong);
router.get('/genre/:id', getAllSongsBySpecificGenre);
router.get('/user/:id', getAllSongsPostByOneUser);
router.get('/:id', getOneSong);
router.post('/', postSong);
router.delete('/:id', deleteSong);



module.exports = router;
