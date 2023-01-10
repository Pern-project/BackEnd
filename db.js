const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

USER = process.env.USER;
PASSWORD = process.env.PASSWORD;
DB_PORT = process.env.DB_PORT;
DB_NAME = process.env.DB_NAME;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: "localhost",
  port: DB_PORT,
  database: DB_NAME,
});

module.exports = pool;
