import { Request, Response, NextFunction } from "express";
import * as db from "../db/queries";

export async function getHomePage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const messages = await db.getMessages();
    const loginFeedback = req.session.messages || [];
    req.session.messages = [];
    res.render("index", {
      title: "Members Only Club",
      user: req.user,
      messages: messages || [],
      loginFeedback,
    });
  } catch (error) {
    next(error);
  }
}

export async function addMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await db.addMessage(
      req.body.title,
      req.body.text,
      req.user!.id,
      new Date(),
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error adding message:", error);
    next(error);
  }
}

export async function deleteMessage(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    await db.deleteMessage(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting message:", error);
    next(error);
  }
}

export function logOut(req: Request, res: Response, next: NextFunction) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
