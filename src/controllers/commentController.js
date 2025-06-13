const commentModel = require('../models/commentModel');

const commentController = {
  async addComment(req, res) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;    
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ message: 'Content is required' });
      }

      const comment = await commentModel.addComment(userId, postId, content);
      res.status(201).json(comment);
    } catch (err) {
      console.error('Add Comment Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getComments(req, res) {
    try {
      const { postId } = req.params;
      const comments = await commentModel.getCommentsByPost(postId);
      res.status(200).json(comments);
    } catch (err) {
      console.error('Get Comments Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteComment(req, res) {
    try {
      const userId = req.user.id;
      const { commentId } = req.params;

      const deleted = await commentModel.deleteComment(commentId, userId);
      if (!deleted) {
        return res.status(404).json({ message: 'Comment not found or unauthorized' });
      }

      res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
      console.error('Delete Comment Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = commentController;
