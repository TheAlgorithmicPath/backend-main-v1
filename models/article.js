const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Article Name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  url: {
    type: String,
    required: [true, "Please Enter Article URL"],
    maxLength: [150, "Please use some url shortner."],
  },
  contributor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleSchema);
