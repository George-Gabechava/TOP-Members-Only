// db/queries.js
const pool = require("./pool");

// Sign Up Handler
async function createUser(firstName, lastName, username, hashedPassword) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, hashedPassword]
  );
}

module.exports = { createUser };
