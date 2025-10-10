const db = require("../db/queries");

async function getHomePage(req, res, next) {
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

async function addMessage(req, res, next) {
  try {
    await db.addMessage(req.body.title, req.body.text, req.user.id, new Date());
    res.redirect("/");
  } catch (error) {
    console.error("Error adding message:", error);
    next(error);
  }
}

async function deleteMessage(req, res, next) {
  try {
    await db.deleteMessage(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting message:", error);
    next(error);
  }
}

function logOut(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  getHomePage,
  addMessage,
  deleteMessage,
  logOut,
};
