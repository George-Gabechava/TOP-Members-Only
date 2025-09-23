// db/queries.js
const pool = require("./pool");

// Sign Up Handler
async function createUser(firstName, lastName, username, hashedPassword) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, hashedPassword]
  );
}

// Get all messages
async function getMessages() {
  const { rows } = await pool.query(
    `SELECT messages.title, messages.text, messages.timestamp, users.username
     FROM messages
     JOIN users ON messages.user_id = users.id
     ORDER BY messages.timestamp DESC`
  );
  return rows;
}

// Add Message Handler
async function addMessage(title, text, authorId, date) {
  await pool.query(
    "INSERT INTO messages (title, text, user_id, timestamp) VALUES ($1, $2, $3, $4)",
    [title, text, authorId, date]
  );
}

// Give membership to user
async function makeMember(userId) {
  await pool.query("UPDATE users SET membership_status = TRUE WHERE id = $1", [
    userId,
  ]);
}

module.exports = { createUser, getMessages, addMessage, makeMember };
