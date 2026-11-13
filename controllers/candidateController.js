const User = require("../models/User");

// Get candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const candidate = await User.findById(req.params.id).select("-password");

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    if (candidate.role !== "candidate") {
      return res.status(400).json({
        message: "User is not a candidate",
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