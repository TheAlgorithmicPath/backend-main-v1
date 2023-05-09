const express = require("express");
const router = express.Router();

const {
  addArticle,
  getArticles,
  addVideo,
  getVideos,
  addQuestion,
  getQuestions,
} = require("../controllers/admin");

const { isAuthenticatedUser, authorizeRoles } = require("../middleWares/auth");

router
  .route("/create-article")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addArticle);
router
  .route("/all-articles")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getArticles);
router
  .route("/create-video")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addVideo);
router
  .route("/all-videos")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getVideos);
router
  .route("/create-question")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addQuestion);
router
  .route("/all-questions")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getQuestions);

module.exports = router;
