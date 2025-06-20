module.exports = {
  secret:process.env.JWT_SECRET,
  expiresIn: '1h',
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiresIn: "1m",
  refreshTokenExpiresIn: "7d",
};
