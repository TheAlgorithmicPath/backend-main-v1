const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  userId: {
    type: String,
    unique: true,
    required: [true, "Please enter your user id"],
    minLength: [3, "Your user id must have at least 3 characters"],
    maxLength: [25, "Your user id cannot exceed 25 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must have at least 6 characters"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    maxLength: [10, "Your phone number cannot exceed 11 characters"],
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  notifications: [
    {
      type: String
    }
  ],
  institute: {
    type: String,
    // required: [true, "Please enter your institute"],
  },
  branch: {
    type: String,
    // required: [true, "Please enter your branch"],
  },
  sem: {
    type: Number,
    // required: [true, "Please enter your semester"],
  },
  year: {
    type: Number,
    // required: [true, "Please enter your year"],
  },
  uiux: {
    type: Boolean,
    default: false,
  },
  webDev: {
    type: Boolean,
    default: false,
  },
  androidDev: {
    type: Boolean,
    default: false,
  },
  blockchain: {
    type: Boolean,
    default: false,
  },
  ethicalHacking: {
    type: Boolean,
    default: false,
  },
  softwareTesting: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  github: {
    type: String,
  },
  whatsApp: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  badges: {
    type: String,
    default: "Beginner",
  },
  contribution: {
    articles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
      },
    ],
    videos: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Video",
      },
    ],
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
      },
    ],
  },
  bookmarks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TopicPage",
    },
  ],
  completed: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TopicPage",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return JSON Web Token(jwt)
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  // generate new password reset token from crypto
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the resetToken and assign to user's resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // setting token expire time to 30min
  this.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
