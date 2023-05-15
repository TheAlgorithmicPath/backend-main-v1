const express = require("express");
const router = express.Router();

const {
  addArticle,
  getArticles,
  updateArticle,
  getFilteredArticles,
  getArticlesBySubject,
  deleteArticle,

  addVideo,
  getVideos,
  getFilteredVideos,
  getVideosBySubject,
  updateVideo,
  deleteVideo,

  addQuestion,
  getQuestions,
  getFilteredQuestions,
  getQuestionsBySubject,
  updateQuestion,
  deleteQuestion,

  createTopicPage,
  getTopicPage,
  updateTopicPage,
  deleteTopicPage,
  getTopicsName,
} = require("../controllers/admin");

const { isAuthenticatedUser, authorizeRoles } = require("../middleWares/auth");

//////////////     Articles     //////////////
router
  .route("/create-article")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addArticle);
router
  .route("/all-articles")
  .get(isAuthenticatedUser,  getArticles);
router
  .route("/get-articles-by-subject/:subject")
  .get(isAuthenticatedUser,  getArticlesBySubject);
router
  .route("/update-article/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateArticle);
router
  .route("/delete-article/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteArticle);

router
  .route("/get-filtered-articles")
  .post(isAuthenticatedUser, getFilteredArticles);

//////////////     Videos     //////////////
router
  .route("/create-video")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addVideo);
router
  .route("/all-videos")
  .get(isAuthenticatedUser, getVideos);
router
  .route("/get-videos-by-subject/:subject")
  .get(isAuthenticatedUser, getVideosBySubject);

router
  .route("/update-video/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateVideo);
router
  .route("/delete-video/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteVideo);
router
  .route("/get-filtered-videos")
  .post(isAuthenticatedUser, getFilteredVideos);


//////////////     Questions     //////////////
router
  .route("/create-question")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addQuestion);
router
  .route("/all-questions")
  .get(isAuthenticatedUser, getQuestions);
router
  .route("/get-questions-by-subject/:subject")
  .get(isAuthenticatedUser, getQuestionsBySubject);
router
  .route("/update-question/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateQuestion);
router
  .route("/delete-question/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteQuestion);
router
  .route("/get-filtered-questions")
  .post(isAuthenticatedUser, getFilteredQuestions);

//////////////     Topic Pages     //////////////

router
  .route("/create-topic-page/:subject")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createTopicPage);

router
  .route("/update-topic-page/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateTopicPage);
router
  .route("/topic-page")
  .get(isAuthenticatedUser, getTopicPage);

router
  .route("/delete-topic-page/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTopicPage);

router
  .route("/get-all-topic-pages")
  .get(isAuthenticatedUser, getTopicsName);

module.exports = router;
