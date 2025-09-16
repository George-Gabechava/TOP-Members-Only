// populateUsers.js
require("dotenv").config();
const pool = require("./pool");

// Example users
const somePeople = [
  {
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    password: "password123",
    membership_status: true,
    admin_status: false,
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    username: "janesmith",
    password: "securepass",
    membership_status: false,
    admin_status: false,
  },
];

async function populateUsers() {
  try {
    for (const item of somePeople) {
      await pool.query(
        "INSERT INTO users (first_name, last_name, username, password, membership_status, admin_status) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          item.first_name,
          item.last_name,
          item.username,
          item.password,
          item.membership_status,
          item.admin_status,
        ]
      );
    }
    console.log("users Database populated!");
  } catch (err) {
    console.error("Error populating:", err);
  } finally {
    pool.end();
  }
}

populateUsers();
