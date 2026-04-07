import "dotenv/config";
import express from "express";
import session from "express-session";
import path from "path";
import pool from "./db/pool";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import indexRouter from "./routes/index";
import signUpRouter from "./routes/signUp";
import secretRouter from "./routes/secret";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

// Passport & Session setup
app.use(
  session({ secret: "confidential", resave: false, saveUninitialized: false }),
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", indexRouter);
app.use("/", signUpRouter);
app.use("/", secretRouter);

// views setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
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
  }),
);

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
