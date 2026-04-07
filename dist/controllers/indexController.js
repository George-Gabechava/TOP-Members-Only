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
exports.getHomePage = getHomePage;
exports.addMessage = addMessage;
exports.deleteMessage = deleteMessage;
exports.logOut = logOut;
const db = __importStar(require("../db/queries"));
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
    }
    catch (error) {
        next(error);
    }
}
async function addMessage(req, res, next) {
    try {
        await db.addMessage(req.body.title, req.body.text, req.user.id, new Date());
        res.redirect("/");
    }
    catch (error) {
        console.error("Error adding message:", error);
        next(error);
    }
}
async function deleteMessage(req, res, next) {
    try {
        await db.deleteMessage(req.params.id);
        res.redirect("/");
    }
    catch (error) {
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
//# sourceMappingURL=indexController.js.map