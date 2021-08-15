const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
    pwd: {
    	type: String,
      	required: true
    },
    role: {
    	type: String,
    	required: true,
    	default: "applicant"
  	},
	date:{
		type: Date,
		required: false
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
