const Article = require("../models/article");
const Video = require("../models/video");
const Question = require("../models/question");
// const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");

//////////////////////     ARTICLE     //////////////////////

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

// Update an article     => /api/v1/update-article/:id
exports.updateArticle = catchAsyncErrors(async (req, res, next) => {
  const updatedArticle = await Article.findByIdAndUpdate(
    req.query.id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Article updated successfully",
    updatedArticle,
  });
});

// Delete an article     => /api/v1/delete-article/:id
exports.deleteArticle = catchAsyncErrors(async (req, res, next) => {
  await Article.findByIdAndDelete(req.query.id);
  res.status(200).json({
    success: true,
    message: "Article deleted successfully",
  });
});

//////////////////////     VIDEO     //////////////////////

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

// Update a video     => /api/v1/update-video/:id
exports.updateVideo = catchAsyncErrors(async (req, res, next) => {
  const updatedVideo = await Video.findByIdAndUpdate(
    { ...req.body },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Video updated successfully",
    updatedVideo,
  });
});

// Delete a video     => /api/v1/delete-video/:id
exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {
  await Video.findByIdAndDelete(req.query.id);
  res.status(200).json({
    success: true,
    message: "Video deleted successfully",
  });
});

//////////////////////     QUESTION     //////////////////////

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

// Update a question     => /api/v1/update-question/:id
exports.updateQuestion = catchAsyncErrors(async (req, res, next) => {
  const updatedQuestion = await Question.findByIdAndUpdate(
    { ...req.body },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Question updated successfully",
    updatedQuestion,
  });
});

// Delete a question     => /api/v1/delete-question/:id
exports.deleteQuestion = catchAsyncErrors(async (req, res, next) => {
  await Question.findByIdAndDelete(req.query.id);
  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

//////////////////////     Topic page     //////////////////////
 