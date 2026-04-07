import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import * as db from "../db/queries";

export const validateSignUp = [
  body("firstName").trim().escape(),
  body("lastName").trim().escape(),
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

export function getSignUpPage(req: Request, res: Response) {
  res.render("signUp", { errors: [] });
}

export async function postSignUp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signUp", { errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      hashedPassword,
    );
    res.redirect("/");
  } catch (error: any) {
    if (error.message && error.message.toLowerCase().includes("duplicate")) {
      return res.render("signUp", {
        errors: [{ msg: "Username already exists. Please choose another." }],
      });
    }
    console.error("Error in sign-up:", error);
    next(error);
  }
}
