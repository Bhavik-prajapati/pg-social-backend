const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/:postId/like', authenticate, likeController.likePost);

module.exports = router;
