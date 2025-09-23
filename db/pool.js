require("dotenv").config();
const { Pool } = require("pg");

// Once deployed on Railway
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
