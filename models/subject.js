const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  dsaPages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TopicPage",
    },
  ],
  languagePages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TopicPage",
    },
  ],
  csFundamentalsPages: [
    {
      type: mongoose.Schema.ObjectId,

      ref: "TopicPage",
    },
  ],
  projectPages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TopicPage",
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
