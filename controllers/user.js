const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandlers");
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");

// Register a user     => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    userId: req.body.userId,
  };
  if (newUserData.userId) {
    const tempUser = await User.findOne({ userId: newUserData.userId });
    if (tempUser) {
      return next(new ErrorHandler("User id already exists", 400));
    }
  }
  if (req.body.avatar) {
    // upload
    const res1 = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: res1.public_id,
      url: res1.secure_url,
    };
  }

  const user = await User.create(newUserData);
  sendToken(user, 200, res);
});

// Login user     => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password are entered or not
  if (!email) {
    return next(new ErrorHandler("Please enter user id", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Please enter password", 400));
  }
  let user;
  if (email.includes("@")) {
    user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }
  } else {
    user = await User.findOne({ userId: email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid user id or Password", 401));
    }
  }

  // Finding user in database
  // const user = await User.findOne({ email }).select("+password");

  // check password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Id or Password", 401));
  }
  sendToken(user, 200, res);
});

// Get currently logged in user details     =>  /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Profile     =>  /api/v1/me/update
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.id) {
    return next(new ErrorHandler("Please enter a valid id", 500));
  }
  const oldUser = await User.findById(req.body.id);
  if (!oldUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    password: oldUser.password,
    phone: req.body.phone,
    institute: req.body.institute,
    company: req.body.company,
    branch: req.body.branch,
    year: req.body.year,
    semester: req.body.semester,
    instagram: req.body.instagram,
    linkedIn: req.body.linkedIn,
    github: req.body.github,
    facebook: req.body.facebook,
    portfolio: req.body.portfolio,
    uiux: req.body.uiux,
    webDev: req.body.webDev,
    androidDev: req.body.androidDev,
    blockchain: req.body.blockchain,
    ethicalHacking: req.body.ethicalHacking,
    softwareTesting: req.body.softwareTesting,
  };
  // console.log(req.body)
  if (req.body.avatar) {
    // delete
    const tempUser = await User.findById(req.user.id);
    const image_id = tempUser?.avatar?.public_id;
    if (image_id) await cloudinary.uploader.destroy(image_id);

    // upload
    const res1 = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: res1.public_id,
      url: res1.secure_url,
    };
  }
  // newUserData.password = await bcrypt.hash(newUserData.password, 10);

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user,
  });
});

// Get Filtered Users     =>  /api/v1/filtered-users
exports.getFilteredUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ ...req.body });
  res.status(200).json({
    success: true,
    users,
  });
});

// Logout user         =>     /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };
  res.header(
    "Access-Control-Allow-Origin",
    "https://frontend-main-v1.vercel.app",
    "http://localhost:3000"
  );
  res.status(200).cookie("token", null, options).json({
    success: true,
    message: "Logged out !!",
  });
});

//////////////////////     Topic page     //////////////////////

// Create a new Topic     => /api/v1/create-topic
exports.createTopic = catchAsyncErrors(async (req, res, next) => {
  const newTopic = await TopicPage.create({ ...req.body });

  res.status(200).json({
    success: true,
    message: "Topic created successfully",
  });
});

// Get topic by id     => /api/v1/topic/:id
exports.getTopicPage = catchAsyncErrors(async (req, res, next) => {
  // const getTopic = await TopicPage.findById(req.query.subject)

  res.status(200).json({
    success: true,
    message: "Got Topic successfully",
  });
});
