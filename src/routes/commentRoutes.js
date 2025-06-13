const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware');

// Add comment to a post
router.post('/:postId', authenticate, commentController.addComment);

// Get all comments for a post
router.get('/:postId', commentController.getComments);

// Delete comment
router.delete('/:commentId', authenticate, commentController.deleteComment);

module.exports = router;
