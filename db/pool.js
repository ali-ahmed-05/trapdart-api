require('dotenv').config()
const Pool = require("pg").Pool;

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  listen_addresses : '*',
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

module.exports = pool;