const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    verifyEmail,
    getUsers
} = require("../controller/authController");

const {
    protect,
    admin
} = require("../middleware/authMiddleware");


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Verify Email
router.post("/verify-email", verifyEmail);


// Get all users - Admin only
router.get("/users", protect, admin, getUsers);


module.exports = router;