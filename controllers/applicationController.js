const Application = require("../models/Application");
const Job = require("../models/job");
 
// Candidate applies for a job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
 
    // Check if candidate has already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });
 
    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }
 
    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
    });
 
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
 
// Recruiter views applicants for a single job
const getApplicants = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("candidate", "name email phone skills experience")
      .populate("job", "title company");
 
    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
 
// Candidate views their own applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    })
      .populate("job", "title company location salary")
      .sort({ createdAt: -1 });
 
    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
 
// Recruiter views applicants for ALL of their jobs
const getRecruiterApplicants = async (req, res) => {
  try {
    // Find all jobs created by this recruiter
    const jobs = await Job.find({
      recruiter: req.user._id,
    }).select("_id");
 
    const jobIds = jobs.map((job) => job._id);
 
    // Find all applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate(
        "candidate",
        "name email phone skills experience"
      )
      .populate(
        "job",
        "title company location salary"
      )
      .sort({ createdAt: -1 });
 
    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
 
// Recruiter updates the status of an application (Pending/Shortlisted/Rejected)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Shortlisted", "Rejected"];
 
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }
 
    const application = await Application.findById(req.params.id).populate("job");
 
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
 
    // Only the recruiter who owns the job can update its applications
    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this application",
      });
    }
 
    application.status = status;
    await application.save();
 
    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
 
module.exports = {
  applyForJob,
  getApplicants,
  getMyApplications,
  getRecruiterApplicants,
  updateApplicationStatus,
};
 





