const db = require('../config/db');

const likeModel = {
  async addLike(userId, postId) {
    const query = `
      INSERT INTO likes (user_id, post_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, post_id) DO NOTHING
      RETURNING *;
    `;
    const values = [userId, postId];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async countLikes(postId){
    const result = await db.query(
      `SELECT COUNT(*) FROM likes WHERE post_id = $1`,
      [postId]
    );
    return parseInt(result.rows[0].count);
  },
  async hasLiked(userId,postId){
    const result=await db.query(`select * from likes where user_id=$1 AND post_id=$2`,[userId,postId]);
    return  result.rows.length>0;
  },
  async removeLike(userId, postId) {
  const result = await db.query(
    `DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *`,
    [userId, postId]
  );
  return result.rowCount > 0; // true if deleted
},

  async getLikesByPost(postId) {
    const query = `
      SELECT * FROM likes
      WHERE post_id = $1;
    `;
    const { rows } = await db.query(query, [postId]);
    return rows;
  },

  async hasUserLiked(userId, postId) {
    const query = `
      SELECT 1 FROM likes
      WHERE user_id = $1 AND post_id = $2;
    `;
    const { rowCount } = await db.query(query, [userId, postId]);
    return rowCount > 0;
  } 
};

module.exports = likeModel;
