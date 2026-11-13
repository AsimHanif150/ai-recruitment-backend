require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const connectDB= require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect,authorize } = require ("./middleware/authMiddleware");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

//connectDB
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidate", candidateRoutes);

//Test route
app.get("/",(req,res)=>{
res.send("AI Recruitment Platform API is running");
});

app.get("/api/profile",protect,(req,res)=>{
    res.json(req.user);
})

app.get(
    "/api/recruiter",
    protect,
    authorize("recruiter"),
    (req,res)=>{
        res.json({
            message : "Welcome Recruiter!",
        });
    }
);

app.get(
    "/api/candidate",
    protect,
    authorize("candidate"),
    (req,res)=> {
        res.json({
            message : " Welcome Candidate !",
        });
    }
);

app.get("/test", (req, res) => {
    res.send("Test route works");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});
