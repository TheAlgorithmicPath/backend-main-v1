const Article = require("../models/article");
const Video = require("../models/video");
const Question = require("../models/question");
const TopicPage = require("../models/topicPage");
// const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const Subject = require("../models/subject");

//////////////////////     ARTICLE     //////////////////////

// Create a new article     => /api/v1/create-article
exports.addArticle = catchAsyncErrors(async (req, res, next) => {
  const article = await Article.create({ ...req.body });

  res.status(200).json({
    success: true,
    message: "Article created successfully",
    article,
  });
});

// Get articles by subject     => /api/v1/get-articles-by-subject/:subject
exports.getArticlesBySubject = catchAsyncErrors(async (req, res, next) => {
  const subject = req.params.subject;
  const articles = await Article.find({ subject });
  res.status(200).json({
    success: true,
    articles,
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
    req.params.id,
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

// Get filtered articles     => /api/v1/get-filtered-articles
exports.getFilteredArticles = catchAsyncErrors(async (req, res, next) => {
  const articleIds = req.body.articleIds;
  const articles = await Article.find({ _id: { $in: articleIds } });
  res.status(200).json({
    success: true,
    articles,
  });
});

// Delete an article     => /api/v1/delete-article/:id
exports.deleteArticle = catchAsyncErrors(async (req, res, next) => {
  await Article.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Article deleted successfully",
  });
});

//////////////////////     VIDEO     //////////////////////

// Create a new video     => /api/v1/create-video
exports.addVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.create({ ...req.body });

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

// Get video by subject     => /api/v1/get-video-by-subject/:subject
exports.getVideosBySubject = catchAsyncErrors(async (req, res, next) => {
  const subject = req.params.subject;
  const videos = await Video.find({ subject });
  res.status(200).json({
    success: true,
    videos,
  });
});

// Update a video     => /api/v1/update-video/:id
exports.updateVideo = catchAsyncErrors(async (req, res, next) => {
  const updatedVideo = await Video.findByIdAndUpdate(
    req.params.id,
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

// Get filtered videos     => /api/v1/get-filtered-videos
exports.getFilteredVideos = catchAsyncErrors(async (req, res, next) => {
  const videoIds = req.body.videoIds;
  const videos = await Video.find({ _id: { $in: videoIds } });
  res.status(200).json({
    success: true,
    videos,
  });
});

// Delete a video     => /api/v1/delete-video/:id
exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {
  await Video.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Video deleted successfully",
  });
});

//////////////////////     QUESTION     //////////////////////

// Create a new Question     => /api/v1/create-question
exports.addQuestion = catchAsyncErrors(async (req, res, next) => {
  const problem = await Question.create({ ...req.body });
  res.status(200).json({
    success: true,
    message: "Problem created successfully",
    problem,
  });
});

// Get questions by subject     => /api/v1/get-articles-by-subject/:subject
exports.getQuestionsBySubject = catchAsyncErrors(async (req, res, next) => {
  const subject = req.params.subject;
  const questions = await Question.find({ subject });
  res.status(200).json({
    success: true,
    questions,
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
    req.params.id,
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

// Get filtered questions     => /api/v1/get-filtered-questions
exports.getFilteredQuestions = catchAsyncErrors(async (req, res, next) => {
  const questionIds = req.body.questionIds;
  const questions = await Question.find({ _id: { $in: questionIds } });
  res.status(200).json({
    success: true,
    questions,
  });
});

// Delete a question     => /api/v1/delete-question/:id
exports.deleteQuestion = catchAsyncErrors(async (req, res, next) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

//////////////////////     Topic page     //////////////////////

// Create a new topic page     => /api/v1/create-topic-page/:subject
exports.createTopicPage = catchAsyncErrors(async (req, res, next) => {
  const subjectType = req.params.subject;
  const topicPage = await TopicPage.create({ ...req.body });
  let subject = await Subject.findById("645aa1b2a6b6cc2c9f88c1d4");
  if (subjectType === "DSA") {
    subject.dsaPages.push(topicPage._id);
  } else if (subjectType === "LANG") {
    subject.languagePages.push(topicPage._id);
  } else if (subjectType === "CSF") {
    subject.csFundamentalsPages.push(topicPage._id);
  } else if (subjectType === "PROJ") {
    subject.projectPages.push(topicPage._id);
  }
  const newSubject = await Subject.findByIdAndUpdate(subject._id, subject, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Topic page created successfully",
    // topicPage,
  });
});

// Update a topic page     => /api/v1/update-topic-page/:id
exports.updateTopicPage = catchAsyncErrors(async (req, res, next) => {
  const updatedTopicPage = await TopicPage.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Topic page updated successfully",
    updatedTopicPage,
  });
});

// Get topic pages        => /api/v1/all-topic-pages
exports.getTopicPage = catchAsyncErrors(async (req, res, next) => {
  const subjects = await Subject.find();
  const subject = subjects[0];
  const topicType = req.query.topic;
  const index = req.query.pageNo - 1;
  let topicPage;
  let articles = [];
  let videos = [];
  let questions = [];
  let pageData;
  if (topicType === "DSA") {
    pageData = await TopicPage.findById(subject.dsaPages[index]);
  } else if (topicType === "LANG") {
    pageData = await TopicPage.findById(subject.languagePages[index]);
  } else if (topicType === "CSF") {
    pageData = await TopicPage.findById(subject.csFundamentalsPages[index]);
  } else if (topicType === "PROJ") {
    pageData = await TopicPage.findById(subject.projectPages[index]);
  }
  for (let i = 0; i < pageData.articles.length; i++) {
    const article = await Article.findById(pageData.articles[i]);
    articles.push(article);
  }
  for (let i = 0; i < pageData.videos.length; i++) {
    const video = await Video.findById(pageData.videos[i]);
    videos.push(video);
  }
  for (let i = 0; i < pageData.questions.length; i++) {
    const question = await Question.findById(pageData.questions[i]);
    questions.push(question);
  }
  topicPage = {
    articles,
    videos,
    questions,
  };

  res.status(200).json({
    success: true,
    topicPage,
  });
});

// Delete a topic page     => /api/v1/delete-topic-page/:id
exports.deleteTopicPage = catchAsyncErrors(async (req, res, next) => {
  await TopicPage.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Topic page deleted successfully",
  });
});

// Get all topics pages    => /api/v1/admin/get-all-topic-pages
exports.getTopicsName = catchAsyncErrors(async (req, res, next) => {
  const subjects = await Subject.find();
  const subject = subjects[0];
  let DSA = [],
    LANG = [],
    CSF = [],
    PROJ = [];
  for (let i = 0; i < subject.dsaPages.length; i++) {
    const dsaPage = await TopicPage.findById(subject.dsaPages[i]);
    DSA.push(dsaPage);
  }
  for (let i = 0; i < subject.languagePages.length; i++) {
    const languagePages = await TopicPage.findById(subject.languagePages[i]);
    LANG.push(languagePages);
  }
  for (let i = 0; i < subject.csFundamentalsPages.length; i++) {
    const csFundamentalsPages = await TopicPage.findById(
      subject.csFundamentalsPages[i]
    );
    CSF.push(csFundamentalsPages);
  }
  for (let i = 0; i < subject.projectPages.length; i++) {
    const projectPages = await TopicPage.findById(subject.projectPages[i]);
    PROJ.push(projectPages);
  }
  const topics = {
    DSA,
    LANG,
    CSF,
    PROJ,
  };
  res.status(200).json({
    success: true,
    topics,
  });
});
