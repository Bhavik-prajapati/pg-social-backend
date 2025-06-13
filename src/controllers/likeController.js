const likeModel = require('../models/likeModel');

const likeController = {
  async likePost(req, res) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;

      console.log(req.user.id,"logged in user")
      console.log(postId,"post id")

      const liked = await likeModel.addLike(userId, postId);
      if (!liked) {
        return res.status(409).json({ message: 'Already liked' });
      }

      res.status(201).json({ message: 'Post liked', like: liked });
    } catch (err) {
      console.error('Like Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async unlikePost(req, res) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;

      const unliked = await likeModel.removeLike(userId, postId);
      if (!unliked) {
        return res.status(404).json({ message: 'Like not found' });
      }

      res.status(200).json({ message: 'Post unliked' });
    } catch (err) {
      console.error('Unlike Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getLikes(req, res) {
    try {
      const { postId } = req.params;
      const likes = await likeModel.getLikesByPost(postId);
      res.status(200).json(likes);
    } catch (err) {
      console.error('Get Likes Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = likeController;
