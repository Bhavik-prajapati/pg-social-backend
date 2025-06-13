const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/follow',authenticateToken, followController.follow);
router.post('/unfollow',authenticateToken, followController.unfollow);
router.get('/:userId/followers', followController.followers);
router.get('/:userId/following', followController.following);

module.exports = router;
