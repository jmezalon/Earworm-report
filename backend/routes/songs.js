const express = require('express');
const router = express.Router();

const { getAllSongsWithUsersGenresOrderByFavorite, getAllSongsWithUsersGenres, getAllSongsBySpecificGenre, getAllFavorites, getAllFavsForSpecificSong, getAllSongsPostByOneUser, getOneSong, getAllGenres, postSong, postGenre, deleteSong, deleteGenre, addFavorite, deleteFavorite, getAllComments, getAllCommentsForSpecificSong, postComment, updateComment, deleteComment } = require('../db/queries/songQueries.js');

router.get('/', getAllSongsWithUsersGenres);
router.get('/bypop', getAllSongsWithUsersGenresOrderByFavorite);
router.get('/comments', getAllComments);
router.get('/comments/:id', getAllCommentsForSpecificSong);
router.post('/comment', postComment)
router.patch('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);
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
