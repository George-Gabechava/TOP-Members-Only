"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getMessages = getMessages;
exports.addMessage = addMessage;
exports.makeMember = makeMember;
exports.makeAdmin = makeAdmin;
exports.deleteMessage = deleteMessage;
const pool_1 = __importDefault(require("./pool"));
async function createUser(firstName, lastName, username, hashedPassword) {
    await pool_1.default.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, hashedPassword]);
}
async function getMessages() {
    const { rows } = await pool_1.default.query(`SELECT messages.id, messages.title, messages.text, messages.timestamp, users.username
     FROM messages
     JOIN users ON messages.user_id = users.id
     ORDER BY messages.timestamp DESC`);
    return rows;
}
async function addMessage(title, text, authorId, date) {
    await pool_1.default.query("INSERT INTO messages (title, text, user_id, timestamp) VALUES ($1, $2, $3, $4)", [title, text, authorId, date]);
}
async function makeMember(userId) {
    await pool_1.default.query("UPDATE users SET membership_status = TRUE WHERE id = $1", [
        userId,
    ]);
}
async function makeAdmin(userId) {
    await pool_1.default.query("UPDATE users SET admin_status = TRUE WHERE id = $1", [
        userId,
    ]);
}
async function deleteMessage(messageId) {
    await pool_1.default.query("DELETE FROM messages WHERE id = $1", [messageId]);
}
//# sourceMappingURL=queries.js.map