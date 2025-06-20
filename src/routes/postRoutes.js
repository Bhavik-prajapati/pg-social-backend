// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateJWT = require('../middlewares/authMiddleware'); // assumes JWT middleware

router.get("/getpostsoffollowing",authenticateJWT,postController.getfollowingsposts)
// router.get("/getpostsoffollowing", authenticateJWT, postController.getfollowingsposts);
router.post('/', authenticateJWT, postController.create);
router.get('/', postController.getAll);
// router.get('/user/:userId', postController.getByUser);
// router.get('/:postId', postController.getById);
// router.delete('/:postId', authenticateJWT, postController.delete);
// router.get('/followings', postController.getFollowingPosts);


module.exports = router;
