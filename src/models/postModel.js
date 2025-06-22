// src/models/postModel.js
const db = require('../config/db');

const postModel = {
  async createPost(userId, content, imageUrl = null) {
    const result = await db.query(
      `INSERT INTO posts (user_id, content, image_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, content, imageUrl]
    );
    return result.rows[0];
  },

  async getPostById(postId) {
    const result = await db.query(
      `SELECT * FROM posts WHERE id = $1`,
      [postId]
    );
    return result.rows[0];
  },

  async getPostsByUser(userId) {
    const result = await db.query(
      `SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async getAllPosts(userId) {
    const result = await db.query(
      `SELECT 
      posts.*, 
      users.name, 
      users.profile_image,
      COUNT(l.id) AS "likeCount",
      BOOL_OR(l.user_id = $1) AS "likedByUser"
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes l ON posts.id = l.post_id
    GROUP BY posts.id, users.id
    ORDER BY posts.created_at DESC
`,[userId]
    );
    return result.rows;
  },

  async deletePost(postId, userId) {
    await db.query(
      `DELETE FROM posts WHERE id = $1 AND user_id = $2`,
      [postId, userId]
    );
  },

  async getPostsFromFollowing(userId) {
    const result = await db.query(
      `
     
      SELECT 
  p.*, 
  COUNT(l.id) AS likes,
  BOOL_OR(l.user_id = $1) AS "likedByUser",
  CASE WHEN fc.follower_id IS NOT NULL THEN true ELSE false END AS "isFollowing"
FROM posts p
LEFT JOIN likes l ON l.post_id = p.id
LEFT JOIN follow_connections fc ON fc.follower_id = $1 AND fc.following_id = p.user_id
WHERE p.user_id = $1 
   OR EXISTS (
     SELECT 1 
     FROM follow_connections f 
     WHERE f.follower_id = $1 AND f.following_id = p.user_id
   )
GROUP BY p.id, fc.follower_id
ORDER BY p.created_at DESC;


     
      `,
      [userId]
    );
    return result.rows;
  }

};

module.exports = postModel;
