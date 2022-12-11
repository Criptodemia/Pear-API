var mysql = require('mysql');
var { CONNECTION } = require('./index.js');
require('dotenv/config');

class brokersDao {
  constructor() {}

  allBrokers() {
    return new Promise((resolve, reject) => {
      CONNECTION.query('SELECT * from brokers', function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results);
      });
    });
  }

  getBroker(id) {
    return new Promise((resolve, reject) => {
      CONNECTION.query('SELECT * from brokers where ID=?', id, function (error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }
}

module.exports = new brokersDao();
