var express = require("express");
var router = express.Router();
const db = require("../db/queries");

// GET home page.
router.get("/", async function (req, res, next) {
  try {
    const messages = await db.getMessages();
    const loginFeedback = req.session.messages || []; // Passport message
    req.session.messages = []; // Clear passport messages
    res.render("index", {
      title: "Members Only Club",
      user: req.user,
      messages: messages || [],
      loginFeedback,
    });
  } catch (error) {
    next(error);
  }
});

// GET membership page
router.get("/secret", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("secret", { user: req.user, errors: [] });
  } else {
    res.redirect("/");
  }
});

// GET log out
router.get("/logOut", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Add message, then render index
router.post("/addMessage", async function (req, res, next) {
  try {
    await db.addMessage(req.body.title, req.body.text, req.user.id, new Date());
    res.redirect("/");
  } catch (error) {
    console.error("Error adding message:", error);
    next(error);
  }
});

// Delete message
router.post("/deleteMessage/:id", async function (req, res, next) {
  try {
    await db.deleteMessage(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting message:", error);
    next(error);
  }
});

module.exports = router;
