var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();//loads environment variables from our .env file into process.env

var generateKeypair = require("./config/generateKeypair");
generateKeypair();//generate the public and private key for authentification
var connection = require("./config/dbConfig"); //import db configuration
connection.connect(function (err) { //connect to database
  if (err) throw err;
  console.log("DB Connected!");
});
var passport = require("./config/passportConfig"); //import passportjs configuration (for authentification)

var app = express();//create express app

app.use(cors());//set Cross-origin resource sharing
app.use(logger("dev"));//customize console logging
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api", require("./routes/index"));//handle api calls routing

app.use(express.static(path.join(__dirname, "sbitarnaClient", "build")));

app.get("*", function (req, res) { //serve react builded html file
  res.sendFile(path.join(__dirname, "sbitarnaClient", "build", "index.html"));
});

module.exports = app;
