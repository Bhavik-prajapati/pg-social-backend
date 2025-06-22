const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile",authenticateToken ,userController.getUser);
router.get("/userprofile/:id",authenticateToken ,userController.getUserbyid);
router.put('/updateprofile', authenticateToken, userController.updateProfile);
router.post('/refresh-token', userController.refreshToken);
router.post('/refresh-token', userController.refreshToken);
router.post('/search',userController.searchbyemail)


module.exports = router;
