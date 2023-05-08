const mongoose = require("mongoose");

const topicPageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Topic Name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },

  articles: [
    {
      id: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],

  videos: [
    {
      id: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],

  problems: [
    {
      id: Schema.Types.ObjectId,
      ref: "Problem",
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