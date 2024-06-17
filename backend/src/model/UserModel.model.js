import mongoose from "mongoose";

// Define the schema for users.
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please provide an email address"], // Validation rule: email is required
		unique: true, // Ensure email is the unique.
	},
	password: {
		type: String,
		required: [true, "Please provide a password"], // Validation rule: password is required
	},
});


export const User = mongoose.model("User", userSchema);
