// src/controllers/postController.js
const postModel = require('../models/postModel');

const postController = {
  async create(req, res) {
    try {
      const userId = req.user.id; // extracted via JWT middleware
      const { content, imageUrl } = req.body;
      const post = await postModel.createPost(userId, content, imageUrl);
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create post' });
    }
  },

  async getById(req, res) {
    try {
      const { postId } = req.params;
      const post = await postModel.getPostById(postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get post' });
    }
  },

  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const posts = await postModel.getPostsByUser(userId);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user posts' });
    }
  },

  async getAll(req, res) {
    try {
      const posts = await postModel.getAllPosts();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  async delete(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;
      await postModel.deletePost(postId, userId);
      res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } 
};

module.exports = postController;
