const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  first_name: {
   type: String,
   required: true
  } ,
  last_name: { 
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  jobTitle: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true
  }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User