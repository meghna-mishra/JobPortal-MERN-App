const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*const educationSchema = new Schema({
    institute: {
        type: String,
        required: true
    },
    start_year: {
        type: String,
        required: true
    },
    end_year: {
        type: String,
    }
})*/
// Create Schema
const ApplicantSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    education: {
        type: Array,
        required: true
    },
    skills: {
        type: Array,
        required: true
    }
});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);