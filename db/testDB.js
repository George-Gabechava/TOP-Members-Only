const pool = require("./pool");
pool
  .query("SELECT current_database()")
  .then((res) => {
    console.log("Connected to database:", res.rows[0].current_database);
    return pool.query("SELECT * FROM users LIMIT 1");
  })
  .then(console.log)
  .catch(console.error);
