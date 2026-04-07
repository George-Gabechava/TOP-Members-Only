"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUp = void 0;
exports.getSignUpPage = getSignUpPage;
exports.postSignUp = postSignUp;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db = __importStar(require("../db/queries"));
exports.validateSignUp = [
    (0, express_validator_1.body)("firstName").trim().escape(),
    (0, express_validator_1.body)("lastName").trim().escape(),
    (0, express_validator_1.body)("username")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters")
        .escape(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    (0, express_validator_1.body)("confirmPassword")
        .custom((value, { req }) => {
        return value === req.body.password;
    })
        .withMessage("Passwords do not match"),
];
function getSignUpPage(req, res) {
    res.render("signUp", { errors: [] });
}
async function postSignUp(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.render("signUp", { errors: errors.array() });
    }
    try {
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        await db.createUser(req.body.firstName, req.body.lastName, req.body.username, hashedPassword);
        res.redirect("/");
    }
    catch (error) {
        if (error.message && error.message.toLowerCase().includes("duplicate")) {
            return res.render("signUp", {
                errors: [{ msg: "Username already exists. Please choose another." }],
            });
        }
        console.error("Error in sign-up:", error);
        next(error);
    }
}
//# sourceMappingURL=signUpController.js.map