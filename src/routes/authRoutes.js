const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { login, protectedRoute, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.get("/protected", authMiddleware, protectedRoute);
router.post("/logout", logout);

module.exports = router;
