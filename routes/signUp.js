// routes/signUp.js
const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");

// Sign Up form
router.get("/signUp", signUpController.getSignUpPage);

// Post Sign Up
router.post(
  "/signUp",
  signUpController.validateSignUp,
  signUpController.postSignUp
);

module.exports = router;
