const likeModel = require('../models/likeModel');

const likeController = {
  async likePost(req, res) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;
      const alreadyLiked = await likeModel.hasLiked(userId, postId);
      if (alreadyLiked) {

        await likeModel.removeLike(userId, postId);
        const count = await likeModel.countLikes(postId)

        return res.status(200).json({ message: 'Post unliked', likeCount: count, liked: false });

      }

      const like = await likeModel.addLike(userId, postId);
      const count = await likeModel.countLikes(postId);

          return res.status(201).json({ message: 'Post liked', likeCount: count, liked: true });

    } catch (err) {
      console.error('Like Error:', err);
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
