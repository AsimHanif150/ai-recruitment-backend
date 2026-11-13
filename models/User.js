const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema (
{
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required:true,
    },
    role : {
        type : String,
        enum : ["admin","recruiter","candidate"],
        default : "candidate" ,
    },
    phone : {
        type : String,
        default : "",
    },
    skills : {
        type : String,
        default : "",
    },
    experience : {
        type : String,
        default : "",
    },
     status : {
        type : String,
        enum : ["Active", "Suspended"],
        default : "Active",
    },
},
{ timestamps : true}
  


 
);


module.exports = mongoose.model("User",userSchema);