// app.js
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const path = require("path");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// routes
const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const secretRouter = require("./routes/secret");
app.use("/", indexRouter);
app.use("/", signUpRouter);
app.use("/", secretRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Passport setup

// Listen on `PORT`
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
