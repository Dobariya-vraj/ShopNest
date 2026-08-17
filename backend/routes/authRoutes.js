const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    verifyEmail,
    getUsers,
    makeAdmin,
    removeAdmin
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

// Make user admin - Admin only
router.put(
  "/users/:id/make-admin",
  protect,
  admin,
  makeAdmin
);

// Remove admin role
router.put(
    "/users/:id/remove-admin",
    protect,
    admin,
    removeAdmin
);

module.exports = router;