const express = require("express");
const router = express.Router();

const { getCandidateById } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Recruiter can view a candidate profile
router.get(
  "/candidate/:id",
  protect,
  authorize("recruiter"),
  getCandidateById
);

module.exports = router;