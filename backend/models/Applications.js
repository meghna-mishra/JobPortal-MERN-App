const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
	name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    recruiter: {
        type: String,
        required: true
    },
    aemail: {
        type: String,
        required: true
    },
    remail: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    education: {
        type: Array,
        required: true
    },
    sop: {
        type: String,
        required: false
    },
    stage: {
        type: String,
        default: "Applied",
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobid: {
        type: String,
    }
});

module.exports = Application = mongoose.model("Applications", ApplicationSchema);