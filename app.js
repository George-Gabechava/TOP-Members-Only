//// app.js
// Load required modules
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.urlencoded({ extended: true }));
const path = require("path");

const pool = require("./db/pool");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Passport & Session setup
app.use(
  session({ secret: "confidential", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
// routes
const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const secretRouter = require("./routes/secret");
app.use("/", indexRouter);
app.use("/", signUpRouter);
app.use("/", secretRouter);

// views setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Passport Local Strategy

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post(
  "/logIn",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);

// Listen on `PORT`
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
