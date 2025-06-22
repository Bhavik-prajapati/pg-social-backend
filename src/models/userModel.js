const db = require("../config/db");
const bcrypt = require('bcrypt');

const UserModel = {
  async createUser(name, email, password) {

    if (!password) {
      throw new Error("Password is required for user creation");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, email, hashedPassword];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async getUserByEmail(email) {
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
  },

 async getUserSearchByEmail(email) {
  const { rows } = await db.query(
    "SELECT * FROM users WHERE email LIKE $1",
    [`%${email}%`] // <-- adds wildcards around the email input
  );
  return rows;
},

  async getByUserId(id) { 
    const { rows } = await db.query("SELECT * FROM users u where u.id= $1", [id]);
    return rows;  
  },  
  async getUserById(id) {
    const { rows } = await db.query("SELECT * FROM users u LEFT JOIN posts ps ON u.id=ps.user_id where u.id= $1", [id]);
    return rows;  
  },  


  
  // models/userModel.js

  async updateProfilePhoto(id, profile_image, { name, email, bio }) {
  const result = await db.query(
    `UPDATE users 
     SET name = $1, email = $2, bio = $3, profile_image = $4 
     WHERE id = $5 
     RETURNING id, name, email, bio, profile_image`,
    [name, email, bio, profile_image, id]
  );
  return result.rows[0];
}


    // async updateUser(id, { name, email, bio }) {
    // const result = await db.query(
    //   `UPDATE users SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING id, name, email, bio`,
    //   [name, email, bio, id]
    // );
    // return result.rows[0];
  // }

};

module.exports = UserModel;
