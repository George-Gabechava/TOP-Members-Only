"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pool_1 = __importDefault(require("./pool"));
const someMessages = [
    {
        user_id: 1,
        title: "Welcome",
        text: "Welcome to the Members Only site!",
        timestamp: new Date(),
    },
    {
        user_id: 2,
        title: "Hello",
        text: "Hello everyone, glad to be here!",
        timestamp: new Date(),
    },
];
async function populateMessages() {
    try {
        for (const item of someMessages) {
            await pool_1.default.query("INSERT INTO messages (user_id, title, text, timestamp) VALUES ($1, $2, $3, $4)", [item.user_id, item.title, item.text, item.timestamp]);
        }
        console.log("messages Database populated!");
    }
    catch (err) {
        console.error("Error populating:", err);
    }
    finally {
        pool_1.default.end();
    }
}
populateMessages();
//# sourceMappingURL=populateMessages.js.map