const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile, getUserById, getAllUsers } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);
router.get("/user/:id", protect, authorize("recruiter", "admin"), getUserById);
router.get("/users", protect, authorize("admin"), getAllUsers);

module.exports = router;