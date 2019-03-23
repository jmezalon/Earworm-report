const express = require('express');
const router = express.Router();


const { getAllComments, getAllCommentsForSpecificSong, postComment, updateComment, deleteComment } = require('../db/queries/commentQueries.js');


router.get('/', getAllComments);
router.get('/:id', getAllCommentsForSpecificSong);
router.post('/add', postComment)
router.patch('/edit/:id', updateComment);
router.delete('/delete/:id', deleteComment);



module.exports = router;
