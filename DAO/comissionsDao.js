var mysql = require('mysql');
var { CONNECTION } = require('./index.js');
require('dotenv/config');

class comissionsDao {
  constructor() {}

  allComissions() {
    return new Promise((resolve, reject) => {
      CONNECTION.query('SELECT * from comissions', function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results);
      });
    });
  }

  getComissionsFromBroker(id) {
    return new Promise((resolve, reject) => {
      CONNECTION.query('SELECT * from comissions where FK_Broker=?', id, function (error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }
}

module.exports = new comissionsDao();
