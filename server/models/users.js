var db = require('../db');
const _ = require('lodash');

module.exports = {
  getAll: function (callback) {
    const queryString = 'SELECT * FROM users;';
    db.promise()
      .query(queryString)
      .then((results) => callback(null, results[0]))
      .catch((err) => callback(err, null));
  },
  create: function ({username}, callback) {
    const checkForUser = `select id from users where username = \'${username}\'`;
    const insertIntoUsers = `INSERT IGNORE INTO users VALUES (default, \'${username}\');`;
    db.promise()
      .query(checkForUser)
      .then((result) => {
        return _.isEmpty(result[0][0]) // If there were no users found
          ? db.promise().query(insertIntoUsers)
          : result;
      })
      .then((result) => callback(null, result))
      .catch((err) => callback(err, null));
  },
};
