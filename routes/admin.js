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
} = require("../controllers/admin");

const { isAuthenticatedUser, authorizeRoles } = require("../middleWares/auth");

//////////////     Articles     //////////////
router
  .route("/create-article")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addArticle);
router
  .route("/all-articles")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getArticles);
router
  .route("/update-article/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateArticle);
router
  .route("/delete-article/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteArticle);

//////////////     Videos     //////////////
router
  .route("/create-video")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addVideo);
router
  .route("/all-videos")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getVideos);
router
  .route("/delete-video/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateVideo);
router
  .route("/update-video/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteVideo);

//////////////     Questions     //////////////
router
  .route("/create-question")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addQuestion);
router
  .route("/all-questions")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getQuestions);
router
  .route("/update-question/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateQuestion);
router
  .route("/delete-question/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteQuestion);


module.exports = router;