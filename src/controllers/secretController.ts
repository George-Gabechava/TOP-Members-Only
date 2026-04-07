import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import * as db from "../db/queries";

export const validateSecretCode = [
  body("secretCode")
    .trim()
    .equals("George")
    .withMessage("Incorrect secret code")
    .escape(),
];

export function getSecretPage(req: Request, res: Response) {
  res.render("secret", { user: req.user, errors: [] });
}

export async function postSecretCode(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("secret", { user: req.user, errors: errors.array() });
  }

  try {
    if (req.body.adminStatus === "on") {
      await db.makeAdmin(req.user!.id);
      req.user!.admin_status = true;
    }
    await db.makeMember(req.user!.id);
    req.user!.membership_status = true;
    res.redirect("/");
  } catch (error) {
    console.error("Error in membership upgrade:", error);
    next(error);
  }
}
