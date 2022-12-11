const { Connection } = require('promise-mysql');
var { CONNECTION } = require('../DAO/index.js');
require('dotenv/config');

class userDao {
  constructor() {}

  allUsers() {
    return new Promise((resolve, reject) => {
      CONNECTION.query('SELECT * from users', function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      CONNECTION.query('SELECT * from users where ID=?', id, function (error, results, fields) {
        if (error) {
          reject(error);
        }
        if (results.length == 1) resolve(results[0]);

        resolve(null);
      });
    });
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      var sqlEmail = 'SELECT * FROM users WHERE Email =? and Password=?';
      CONNECTION.query(sqlEmail, [username, password], function (error, results, fields) {
        if (error) {
          reject(error);
        }

        if (results.length == 1) {
          resolve(results[0]);
        }
        resolve(null);
      });

      var sqlUser = 'SELECT * FROM users WHERE Username =? and Password=?';
      CONNECTION.query(sqlUser, [username, password], function (error, results, fields) {
        if (error) {
          throw error;
        }

        if (results.length == 1) {
          resolve(results[0]);
        } else if (results.length == 0) {
          resolve(null);
        }
        console.log('LoginWithUsername: ', results[0]);
      });
    });
  }
}

module.exports = new userDao();
