"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const pool_1 = __importDefault(require("./db/pool"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const index_1 = __importDefault(require("./routes/index"));
const signUp_1 = __importDefault(require("./routes/signUp"));
const secret_1 = __importDefault(require("./routes/secret"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
// Passport & Session setup
app.use((0, express_session_1.default)({ secret: "confidential", resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// routes
app.use("/", index_1.default);
app.use("/", signUp_1.default);
app.use("/", secret_1.default);
// views setup
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
// Passport Local Strategy
passport_1.default.use(new passport_local_1.Strategy(async (username, password, done) => {
    try {
        const { rows } = await pool_1.default.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool_1.default.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        const user = rows[0];
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
app.post("/logIn", passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
}));
// Listen on PORT
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map