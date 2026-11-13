const express = require("express");
const router = express.Router();
 
const {
    applyForJob,
    getApplicants,
    getMyApplications,
    getRecruiterApplicants,
    updateApplicationStatus,
} = require("../controllers/applicationController");
 
const { protect, authorize } = require("../middleware/authMiddleware");
 
router.post(
    "/",
    protect,
    authorize("candidate"),
    applyForJob
);
 
router.get(
    "/my",
    protect,
    authorize("candidate"),
    getMyApplications
);
 
router.get(
    "/recruiter",
    protect,
    authorize("recruiter"),
    getRecruiterApplicants
);
 
router.get(
    "/:jobId",
    protect,
    authorize("recruiter"),
    getApplicants
);
 
router.patch(
    "/:id/status",
    protect,
    authorize("recruiter"),
    updateApplicationStatus
);
 
module.exports = router;
 





