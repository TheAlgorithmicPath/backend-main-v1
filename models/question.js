const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Question Name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  url: {
    type: String,
    required: [true, "Please Enter Question URL"],
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
  inUse: {
    type: Boolean,
    default: false,
  },
  subject: {
    type: String,
    enum: {
      values: ["DSA", "LANG", "CSF", "PROJ"],
      message: "Please select correct type",
    },
    required: [true, "Please select Subject"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
