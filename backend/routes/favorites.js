const express = require('express');
const router = express.Router();


const { getAllSongsWithUsersGenresOrderByFavorite, addFavorite, deleteFavorite, getAllFavorites, getAllFavsForSpecificSong, getAllFavsForSpecificUser } = require('../db/queries/favoriteQueries.js');


router.get('/', getAllFavorites);
router.get('/user/:id', getAllFavsForSpecificUser)
router.get('/order', getAllSongsWithUsersGenresOrderByFavorite);
router.get('/:id/songs', getAllFavsForSpecificSong);
router.post('/', addFavorite);
router.delete('/:id', deleteFavorite);



module.exports = router;
