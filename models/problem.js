const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Problem Name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  url: {
    type: String,
    required: [true, "Please Enter Problem URL"],
    maxLength: [150, "Please use some url shortner."],
  },
  contributer: {
    type: Schema.Types.ObjectId,
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

module.exports = mongoose.model("Problem", problemSchema);
