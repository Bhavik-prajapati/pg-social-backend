const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const jwtConfig = require("../config/jwt");


const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    jwtConfig.accessTokenSecret,
    { expiresIn: jwtConfig.accessTokenExpiresIn }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    jwtConfig.refreshTokenSecret,
    { expiresIn: jwtConfig.refreshTokenExpiresIn }
  );

  return { accessToken, refreshToken };
};

const userController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const userExist = await UserModel.getUserByEmail(email);
      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await UserModel.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
    console.error("Registration error:", error);
      res.status(500).json({ error: "User registration failed" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getUserByEmail(email);
      if (!user) return res.status(401).json({ error: "Invalid email or password" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: "Invalid email or password" });


      const tokens = generateTokens(user);
      // res.json({ tokens });
      res.json({ user: { id: user.id, email: user.email, name: user.name }, tokens });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  },
  async refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "Refresh token required" });

  jwt.verify(refreshToken, jwtConfig.refreshTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      jwtConfig.accessTokenSecret,
      { expiresIn: jwtConfig.accessTokenExpiresIn }
    );

    res.json({ accessToken: newAccessToken });
  });
},

  async getUser(req, res) {
    try {
      console.log(req.user)
      const { id } = req.user;
      console.log(id,"id")
      const user = await UserModel.getUserById(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },
  async updateProfile(req, res) {
  try {
    const { id } = req.user;
    const {  profile_image  } = req.body;
    console.log(req.body.profile_image,"image")
    const { name, email, bio } = req.body;
    const updatedUser = await UserModel.updateProfilePhoto(id,profile_image ,{ name, email, bio });
    res.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Profile update failed" });
  }
}
};

module.exports = userController;
