const express = require('express');
const router = express.Router();

const { getAllSongsBySpecificGenre, getAllGenres, postGenre, deleteGenre } = require('../db/queries/genreQueries.js');



router.get('/', getAllGenres);
router.get('/:id/songs', getAllSongsBySpecificGenre);
router.post('/', postGenre);
router.delete('/:id', deleteGenre);


module.exports = router;
