const Article = require("../models/article");
const Video = require("../models/video");
const Question = require("../models/question");
const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");

// Create a new article     => /api/v1/create-article
exports.addArticle = catchAsyncErrors(async (req, res, next) => {
  const newArticle = {
    name: req.body.name,
    contributor: req.body.contributor,
    url: req.body.url,
  };
  const article = await Article.create(newArticle);

  res.status(200).json({
    success: true,
    message: "Article created successfully",
    article,
  });
});

// Get all articles     => /api/v1/all-articles
exports.getArticles = catchAsyncErrors(async (req, res, next) => {
  const articles = await Article.find();
  res.status(200).json({
    success: true,
    articles,
  });
});

// Create a new video     => /api/v1/create-video
exports.addVideo = catchAsyncErrors(async (req, res, next) => {
  const newVideo = {
    name: req.body.name,
    contributor: req.body.contributor,
    url: req.body.url,
  };
  const video = await Video.create(newVideo);

  res.status(200).json({
    success: true,
    message: "Video created successfully",
    video,
  });
});

// Get all videos     => /api/v1/all-videos
exports.getVideos = catchAsyncErrors(async (req, res, next) => {
  const videos = await Video.find();
  res.status(200).json({
    success: true,
    videos,
  });
});

// Create a new Question     => /api/v1/create-question
exports.addQuestion = catchAsyncErrors(async (req, res, next) => {
  const newProblem = {
    name: req.body.name,
    contributor: req.body.contributor,
    url: req.body.url,
  };
  const problem = await Question.create(newProblem);

  res.status(200).json({
    success: true,
    message: "Problem created successfully",
    problem,
  });
});

// Get all questions     => /api/v1/all-questions
exports.getQuestions = catchAsyncErrors(async (req, res, next) => {
  const questions = await Question.find();
  res.status(200).json({
    success: true,
    questions,
  });
});
