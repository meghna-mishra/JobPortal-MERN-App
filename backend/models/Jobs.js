const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	recruiter: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
    salary: {
    	type: Number,
    	required: true
    },
    maxapps: {
    	type: Number,
    	required: true
    },
    maxpos: {
    	type: Number,
    	required: true
    },
    deadline: {
    	type: String,
    	required: true
    },
    skills: {
    	type: String,
    	required: true
    },
    type: {
    	type: String,
    	required: true,
    	default: "Full time"
    },
    duration: {
    	type: String,//so that we can have dropdown with months
        default: "undefined",
    	required: true
    },
    rating: {
    	type: Number,
    	min: 0,
    	max: 5,
        default: 0,
    	required: false//idk????
    },
	date: {
		type: Date,
		required: true,
		default: Date.now()
	},
    applicants: {
        type: Array,
        required: false
    }
});

module.exports = Job = mongoose.model("Jobs", JobSchema);