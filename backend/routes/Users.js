var express = require("express");
var router = express.Router();
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
// Load User model
const User = require("../models/Users");
const Recruiter = require("../models/Recruiters");
const Applicant = require("../models/Applicants");
const Job = require("../models/Jobs");
const Application = require("../models/Applications");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
            
		} else {
			res.json(users);
		}
	})
});

router.get("/jobslist", function(req, res) {
    Job.find(function(err, jobs) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            
        } else {
            res.json(jobs);
        }
    })
});

router.post("/activejobs", (req, res) => {
    const email= req.body.email;
    Job.find({ email }, (err, jobs) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            
        } else {
            res.json(jobs);
        }
    })
});

router.post("/viewapplications", (req, res) => {
    const jobid = req.body.jobid;
    Application.find({ jobid }, (err, app) => {
        console.log(app);
        res.json(app);
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    console.log(req.body);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd,
        role: req.body.role,
        date: req.body.date
    });
    //console.log(localStorage.getItem("role"));
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/createrecruiter", (req, res) => {
    console.log(req.body);
    const newRec = new Recruiter({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        bio: req.body.bio,
    });
    
    newRec.save()
        .then(rec => {
            res.status(200).json(rec);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

router.post("/createapplicant", (req, res) => {
    console.log(req.body);
    const newApp = new Applicant({
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        education: req.body.education
    });
    //console.log(localStorage.getItem("role"));
    newApp.save()
        .then(app => {
            res.status(200).json(app);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/createapplication", (req, res) => {
    const email = req.body.email;
    const jobtitle = req.body.title;
    const remail = req.body.remail;
    const jobid = req.body.jobid;
    Job.findOne({ _id : jobid }).then(job => {
        if(!job)
        {
            return res.status(404).json({
            error: "Job not found.",
            });
        }
        else
        {
            if(job.applicants.length == job.maxapps)
            {
                res.send("Maximum applications reached.");
            }
            else
            {
                Job.findOneAndUpdate({ _id: jobid }, {$push: {applicants: email} }, {new: true} ).then(job => {
                if(!job)
                {
                    return res.status(404).json({
                    error: "Job not found.",
                    });
                }
                else
                {
                    console.log(job);
                    console.log(job.applicants);
                }
                });
                Applicant.findOne({ email }).then(app => {
                // Check if user email exists
                if (!app) {
                    return res.status(404).json({
                        error: "Email not found.",
                    });
                }
                else{
                    const newAp = new Application({
                    name: app.name,
                    aemail: app.email,
                    remail: req.body.remail,
                    title: req.body.title,
                    skills: app.skills,
                    sop: req.body.sop,
                    education: app.education,
                    salary: req.body.salary,
                    recruiter: req.body.recruiter,
                    jobid: req.body.jobid
                    });
                
                newAp.save()
                    .then(ap => {
                        res.send("Application submitted.");
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });
                    }
                });
            }
        }
    });

});

router.post("/editrecruiter", (req, res) => {
    //res.send("ABCD");
    const email = req.body.email;
    Recruiter.findOneAndUpdate({ email }, {$set: {contact: req.body.contact, bio: req.body.bio}}, {new: true}).then(rec => {
        if(!rec)
        {
            return res.status(404).json({
                error: "Email not found.",
            });
        }
        else
        {
            console.log(rec);
            res.json(rec);
        }
    })
});

router.post("/editjob", (req, res) => {
    const _id = req.body.id;
    Job.findOneAndUpdate({ _id }, {$set: {maxapps: req.body.maxapps, maxpos: req.body.maxpos, deadline: req.body.deadline}}, {new: true}).then(job => {
        if(!job)
        {
            return res.status(404).json({
                error: "Job not found.",
            });
        }
        else
        {
            console.log(job);
            res.json(job);
        }
    })
});

router.post("/deletejob", (req, res) => {
    const _id = req.body.id;
    Job.deleteOne({ _id }).then(job => {
        if(!job)
        {
            return res.status(404).json({
                error: "Job not found.",
            });
        }
        else
        {
            res.send("Job deleted.");
        }
    });
    Application.deleteMany({ jobid: _id}).then(app => {
        console.log("Applications (if any) deleted.");
    })
});

router.post("/reject", (req, res) => {
    const _id = req.body.id;
    Application.findOneAndUpdate({ _id }, {$set: {stage: "Rejected"}}).then(app => {
        if(!app)
        {
            return res.status(404).json({
                error: "Application not found.",
            });
        }
        else
        {
            res.json(app);
        }
    });
});

router.post("/shortlist", (req, res) => {
    const _id = req.body.id;
    Application.findOneAndUpdate({ _id }, {$set: {stage: "Shortlisted"}}).then(app => {
        if(!app)
        {
            return res.status(404).json({
                error: "Application not found.",
            });
        }
        else
        {
            res.json(app);
        }
    });
});

router.post("/accept", (req, res) => {
    const _id = req.body.id;
    Application.findOneAndUpdate({ _id }, {$set: {stage: "Accepted"}}).then(app => {
        if(!app)
        {
            return res.status(404).json({
                error: "Application not found.",
            });
        }
        else
        {
            res.json(app);
        }
    });
});

router.post("/editapplicant", (req, res) => {
    //res.send("ABCD");
    const email = req.body.email;
    Applicant.findOneAndUpdate({ email }, {$set: {education: req.body.education, skills: req.body.skills}}, {new: true}).then(app => {
        if(!app)
        {
            return res.status(404).json({
                error: "Email not found.",
            });
        }
        else
        {
            console.log(app);
            res.json(app);
        }
    })
});

router.post("/myapplications", (req, res) => {
    const aemail = req.body.email;
    Application.find({ aemail }).then(app => {
        console.log(app);
        res.json(app);
    })
});

// POST request 
// Login
router.post("/login", (req, res) => {

	const email = req.body.email;
    const pwd = req.body.pwd;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found.",
			});
        }
        else{
            if(user.pwd == pwd) {
                
                res.json(user);
            }
            else {
                return res.status(400).json({
                error: "Password incorrect.",
                });
            }
        }
	});
});

router.post("/createjob", (req, res) => {
    const newJob = new Job({
            title: req.body.title,
            recruiter: req.body.recruiter,
            salary: req.body.salary,
            maxapps: req.body.maxapps,
            maxpos: req.body.maxpos,
            deadline: req.body.deadline,
            skills: req.body.skills,
            type: req.body.type,
            duration: req.body.duration,
            //rating: req.body.rating,
            email: req.body.email,
            date: Date.now()
        });
    newJob.save()
        .then(job => {
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/recruiterprofile", (req, res) => {
    const email = req.body.email;
    // Find user by email
    Recruiter.findOne({ email }).then(recruiter => {
        // Check if user email exists
        if (!recruiter) {
            return res.status(404).json({
                error: "Email not found.",
            });
        }
        else{
            //Send entire user as JSON object
                res.json(recruiter);
        }
    });
});

router.post("/applicantprofile", (req, res) => {
    const email = req.body.email;
    // Find user by email
    Applicant.findOne({ email }).then(applicant => {
        // Check if user email exists
        if (!applicant) {
            return res.status(404).json({
                error: "Email not found.",
            });
        }
        else{
            //Send entire user as JSON object
                res.json(applicant);
        }
    });
});

module.exports = router;

