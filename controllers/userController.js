const User = require("../models/User");

// Get a candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const candidate = await User.findById(req.params.id).select("-password");

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    // Ensure the requested user is actually a candidate
    if (candidate.role !== "candidate") {
      return res.status(400).json({
        message: "This user is not a candidate",
      });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCandidateById,
};