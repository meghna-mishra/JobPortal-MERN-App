const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
    contact: {
    	type: String,
    	required: true
    },
    bio: {
    	type: String,
    	maxLength: 250,
    	required: false//idk???
    }
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);
