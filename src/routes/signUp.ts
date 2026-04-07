import express from "express";
import * as signUpController from "../controllers/signUpController";

const router = express.Router();

// Sign Up form
router.get("/signUp", signUpController.getSignUpPage);

// Post Sign Up
router.post(
  "/signUp",
  signUpController.validateSignUp,
  signUpController.postSignUp,
);

export default router;
