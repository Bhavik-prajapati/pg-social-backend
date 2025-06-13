const db = require('../config/db');

const followModel = {
  async followUser(followerId, followingId) {
    const result = await db.query(
      `INSERT INTO follow_connections (follower_id, following_id) 
       VALUES ($1, $2) RETURNING *`,
      [followerId, followingId]
    );
    return result.rows[0];
  },

  async unfollowUser(followerId, followingId) {
    await db.query(
      `DELETE FROM follow_connections WHERE follower_id = $1 AND following_id = $2`,
      [followerId, followingId]
    );
  },

  async getFollowers(userId) {
    const result = await db.query(
      `SELECT users.* FROM follow_connections 
       JOIN users ON follow_connections.follower_id = users.id 
       WHERE follow_connections.following_id = $1`,
      [userId]
    );
    return result.rows;
  },

  async getFollowing(userId) {
    const result = await db.query(
      `SELECT users.* FROM follow_connections 
       JOIN users ON follow_connections.following_id = users.id 
       WHERE follow_connections.follower_id = $1`,
      [userId]
    );
    return result.rows;
  }
};

module.exports = followModel;
