const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
// let cors = require('cors')

// app.use(cors()) ;

const errorMiddleware = require("./middleWares/errors");


//setting up config file
dotenv.config({ path: "./config/config.env" });


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload());

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

// import all routes here
app.use("/api/v1/", userRoutes);
app.use("/api/v1/admin/", adminRoutes);

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
