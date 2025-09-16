require("dotenv").config();
const { Pool } = require("pg");

// For deployment on Railway
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
