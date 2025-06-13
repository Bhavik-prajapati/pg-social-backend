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

  async getAllPosts() {
    const result = await db.query(
      `SELECT posts.*, users.name, users.profile_image
       FROM posts
       JOIN users ON posts.user_id = users.id
       ORDER BY posts.created_at DESC`
    );
    return result.rows;
  },

  async deletePost(postId, userId) {
    await db.query(
      `DELETE FROM posts WHERE id = $1 AND user_id = $2`,
      [postId, userId]
    );
  }
};

module.exports = postModel;
