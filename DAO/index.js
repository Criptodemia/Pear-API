var mysql = require('mysql');
require('dotenv/config');
require('../DAO/index.js');

const CONNECTION = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
  // socketPath: process.env.SOCKET
});

module.exports = {
  CONNECTION,
};
