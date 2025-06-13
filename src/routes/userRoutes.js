const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/userprofile",authenticateToken ,userController.getUser);
router.put('/updateprofile', authenticateToken, userController.updateProfile);


module.exports = router;
