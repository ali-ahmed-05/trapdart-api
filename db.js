const Pool = require("pg").Pool;

const pool = new Pool({
  user: "cpxvpfnjoznaao",
  password: "6899755bf47d6934caf51e8aba46a5f9a6919e1d2d96d19f55616b8e0bba561b",
  host: "ec2-44-195-162-77.compute-1.amazonaws.com",
  port: 5432,
  database: "ddlu0m2l2s2eej",
  listen_addresses : '*',
  ssl: {    /* <----- Add SSL option */
    rejectUnauthorized: false,
  },  
});

module.exports = pool;