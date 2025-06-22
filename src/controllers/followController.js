const followModel = require('../models/followModel');

const followController = {
  async follow(req, res) {
    try {
      const followerId=req.user.id;
      const {followingId } = req.body;

      if (followerId === followingId) {
        return res.status(400).json({
          success: false,
          message: "You cannot follow yourself."
        });
    }
    
      const result = await followModel.followUser(followerId, followingId);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to follow user' });
    }
  },

  async unfollow(req, res) {
    try {
      const { followerId, followingId } = req.body;
      await followModel.unfollowUser(followerId, followingId);
      res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to unfollow user' });
    }
  },

  async followers(req, res) {
    try {
      const { userId } = req.params;
      const followers = await followModel.getFollowers(userId);
      res.json(followers);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch followers' });
    }
  },

  async following(req, res) {
    try {
      const { userId } = req.params;
      const following = await followModel.getFollowing(userId);
      res.json(following);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch following users' });
    }
  }
};

module.exports = followController;
