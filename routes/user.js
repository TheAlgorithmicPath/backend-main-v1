const express = require("express");
const router = express.Router();

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
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.route("/test").get((req, res) => {
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("token", "test-token", options);
  res.status(200).json({
    success: true,
    message: "Welcome to the API, this is test route, Server running successfully !!",
  });
});
module.exports = router;
