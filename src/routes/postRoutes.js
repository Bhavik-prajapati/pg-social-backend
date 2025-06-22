// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateJWT = require('../middlewares/authMiddleware'); // assumes JWT middleware
const upload=require("../middlewares/upload");

router.get("/getpostsoffollowing",authenticateJWT,postController.getfollowingsposts)
router.post('/', authenticateJWT,upload.single('image'), postController.create);
router.get('/', authenticateJWT,postController.getAll);
router.get('/user/:userId', postController.getByUser);
router.get('/:postId', postController.getById);
router.delete('/:postId', authenticateJWT, postController.delete);


module.exports = router;
