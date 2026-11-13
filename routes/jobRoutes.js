const express = require("express");
const router = express.Router();

const {
    createjob,
    getjobs,
    getjobById,
    deletejob,
} = require("../controllers/jobcontroller");

const { protect, authorize } = require("../middleware/authMiddleware");

// Get all jobs
router.get("/", getjobs);

// Create a job (Recruiters only)
router.post("/", protect, authorize("recruiter"), createjob);

// Get a single job
router.get("/:id", getjobById);

// Delete a job (Recruiters only)
router.delete("/:id", protect, authorize("recruiter", "admin"), deletejob);

module.exports = router;