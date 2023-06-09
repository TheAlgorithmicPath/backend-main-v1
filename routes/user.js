const express = require("express");
const router = express.Router();

// const Subject = require("../models/subject");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getFilteredUsers,
  logout,
} = require("../controllers/user");

const { isAuthenticatedUser } = require("../middleWares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/filtered-users").post(isAuthenticatedUser, getFilteredUsers);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/logout").get(logout);
router.route("/isAuthenticatedUser").get(isAuthenticatedUser, (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://frontend-main-v1.vercel.app", "http://localhost:3000");
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.route("/test").get(async(req, res) => {
  // const newSubject = await Subject.create({
  //   dsaPages: [],
  //   languagePages: [],
  //   csFundamentalsPages: [],
  //   projectPages: [],
  // });
  res.header("Access-Control-Allow-Origin", "*");
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("token", "test-token", options);
  res.status(200).json({
    success: true,
    newSubject,
    message: "Welcome to the API, this is test route, Server running successfully !!",
  });
});
module.exports = router;
