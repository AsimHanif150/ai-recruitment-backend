const Job = require("../models/job");

//create job
const createjob = async (req,res) => {
    try {
        const{title, company ,location,description,salary} = req.body;
        const job = await Job.create({
            title,
            company,
            location,
            description,
            salary,
            recruiter: req.user._id,
        });

        res.status(201).json(job);

    } catch(error) {
        res.status(500).json({
          message: error.message,
        });
    }
};

//get all jobs 
const getjobs = async (req,res) => {
    try {
        const jobs = await Job.find().populate(
            "recruiter",
            "name email"
        );
    res.json(jobs);
    
    } 
    catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
};

//get single job
const getjobById = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id).populate(
            "recruiter",
            "name email"
        );
        if(!job){
            return res.status(404).json({
                message: "job not found",
            });
        }
        res.json(job);
    }catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
};
//Delete Job
const deletejob = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id);
            
        if(!job){
            return res.status(404).json({
                message: "job not found",
            });
        }
        await job.deleteOne();

        res.json({
            message: "job deleted successfully",
        });

    }catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
};

module.exports = {
    createjob,
    getjobs,
    getjobById,
    deletejob,
}