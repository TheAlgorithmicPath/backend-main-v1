const mongoose = require("mongoose");

const topicPageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Topic Name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },

  articles: [
    {
      id: mongoose.Schema.ObjectId,
      ref: "Article",
    },
  ],

  videos: [
    {
      id: mongoose.Schema.ObjectId,
      ref: "Video",
    },
  ],

  questions: [
    {
      id: mongoose.Schema.ObjectId,
      ref: "Question",
    },
  ],

  code:{
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  }
});

module.exports = mongoose.model("TopicPage", topicPageSchema);