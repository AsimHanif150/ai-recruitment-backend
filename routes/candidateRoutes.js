const express = require ("express");
const router = express.Router();


const {protect} = require("../middleware/authMiddleware");
const {getCandidateById} = require("../controllers/candidateController");

//Recruiter /Admin can view a  candidate profile
router.get("/:id",protect , getCandidateById);

module.exports = router;