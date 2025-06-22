const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/:postId/like', authenticate, likeController.likePost);
// router.delete('/:postId/unlike', authenticate, likeController.unlikePost);
router.get('/:postId/likes', likeController.getLikes);

module.exports = router;
