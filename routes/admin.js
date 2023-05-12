const express = require("express");
const router = express.Router();

const {
  addArticle,
  getArticles,
  updateArticle,
  deleteArticle,

  addVideo,
  getVideos,
  updateVideo,
  deleteVideo,

  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,

  createTopicPage,
  getTopicPage,
  updateTopicPage,
  deleteTopicPage,
} = require("../controllers/admin");

const { isAuthenticatedUser, authorizeRoles } = require("../middleWares/auth");

//////////////     Articles     //////////////
router
  .route("/admin/create-article")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addArticle);
router
  .route("/admin/all-articles")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getArticles);
router
  .route("/admin/update-article/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateArticle);
router
  .route("/admin/delete-article/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteArticle);

//////////////     Videos     //////////////
router
  .route("/admin/create-video")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addVideo);
router
  .route("/admin/all-videos")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getVideos);
router
  .route("/admin/delete-video/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateVideo);
router
  .route("/admin/update-video/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteVideo);

//////////////     Questions     //////////////
router
  .route("/admin/create-question")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addQuestion);
router
  .route("/admin/all-questions")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getQuestions);
router
  .route("/admin/update-question/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateQuestion);
router
  .route("/admin/delete-question/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteQuestion);

//////////////     Topic Pages     //////////////

router
  .route("/create-topic-page/:topic")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createTopicPage);

router
  .route("/update-topic-page/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateTopicPage);
router
  .route("/topic-page")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getTopicPage);

router
  .route("/delete-topic-page/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTopicPage);

module.exports = router;
