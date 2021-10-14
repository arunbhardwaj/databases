var db = require("../db");

module.exports = {
  getAll: function (callback) {
    const queryString = 'SELECT * FROM messages';
    const queryArgs = [];

    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
    // db.end();
  }, // a function which produces all the messages .... from the database???
  create: function ({ text, username, roomname }, callback) {
    const queryString1 = `INSERT IGNORE INTO users VALUES (default, \'${username}\');`;
    const queryString2 = `INSERT IGNORE INTO rooms VALUES (default, \'${roomname}\');`;
    const queryString3 = `INSERT INTO messages VALUES (
      default,
      (SELECT id FROM users WHERE username=\'${username}\'),
      \'${text}\',
      (SELECT id FROM rooms WHERE name=\'${roomname}\')
    );`;
    const queryArgs = [];
    db.query(queryString1, queryArgs, (err, results) => {
      console.log({'querystring1': queryString1});
      if (err) {
        callback(err, null);
      }
      //TODO: check if a user exists by that username first before inserting into
      // the database. This will avoid autoincrementing for the same user, making
      // the next brand new user to enter the database have a larger id than
      // desired.
      db.query(queryString2, queryArgs, (err, results) => {
        console.log({'querystring2': queryString2});
        if (err) {
          callback(err, null);
        }
        db.query(queryString3, queryArgs, (err, results) => {
          console.log({'queryString3': queryString3});
          if (err) {
            callback(err, null);
          }
          callback(null, results);
        });
      });
    });
  }, // a function which can be used to insert a message into the database
};
