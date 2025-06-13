// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateJWT = require('../middlewares/authMiddleware'); // assumes JWT middleware

router.post('/', authenticateJWT, postController.create);
router.get('/', postController.getAll);
router.get('/user/:userId', postController.getByUser);
router.get('/:postId', postController.getById);
router.delete('/:postId', authenticateJWT, postController.delete);

module.exports = router;
