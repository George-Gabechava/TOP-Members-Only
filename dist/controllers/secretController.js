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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSecretCode = void 0;
exports.getSecretPage = getSecretPage;
exports.postSecretCode = postSecretCode;
const express_validator_1 = require("express-validator");
const db = __importStar(require("../db/queries"));
exports.validateSecretCode = [
    (0, express_validator_1.body)("secretCode")
        .trim()
        .equals("George")
        .withMessage("Incorrect secret code")
        .escape(),
];
function getSecretPage(req, res) {
    res.render("secret", { user: req.user, errors: [] });
}
async function postSecretCode(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.render("secret", { user: req.user, errors: errors.array() });
    }
    try {
        if (req.body.adminStatus === "on") {
            await db.makeAdmin(req.user.id);
            req.user.admin_status = true;
        }
        await db.makeMember(req.user.id);
        req.user.membership_status = true;
        res.redirect("/");
    }
    catch (error) {
        console.error("Error in membership upgrade:", error);
        next(error);
    }
}
//# sourceMappingURL=secretController.js.map