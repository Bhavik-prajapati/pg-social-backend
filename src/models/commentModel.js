const db = require('../config/db');

const CommentModel = {
  async addComment(userId, postId, content) {
    const query = `
      INSERT INTO comments (user_id, post_id, content)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [userId, postId, content];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async getCommentsByPost(postId) {
    const query = `
      SELECT comments.*, users.name
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE post_id = $1
      ORDER BY created_at DESC;
    `;
    const { rows } = await db.query(query, [postId]);
    return rows;
  },

  async deleteComment(commentId, userId) {
    const query = `
      DELETE FROM comments
      WHERE id = $1 AND user_id = $2
      RETURNING *;
    `;
    const { rows } = await db.query(query, [commentId, userId]);
    return rows[0];
  }
};

module.exports = CommentModel;
