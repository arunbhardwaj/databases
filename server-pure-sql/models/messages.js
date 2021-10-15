/* eslint-disable quotes */
var db = require('../db');
const _ = require('lodash');

module.exports = {
  // a function which produces all the messages .... from the database???
  getAll: function (callback) {
    const queryString = 'SELECT * FROM messages;';
    db.promise().query(queryString)
      .then(results => callback(null, results[0])) // There has to be a better way than using 0-index to get rid of the Buffer field?
      .catch(err => callback(err, null));

    // db.end(); // When do you use this?
  },

  // a function which can be used to insert a message into the database
  create: function ({ text, username, roomname }, callback) {
    const checkForUser = `select id from users where username = \'${username}\'`;
    const checkForRoom = `select id from rooms where name = \'${roomname}\'`;
    const insertIntoUsers = `INSERT IGNORE INTO users VALUES (default, \'${username}\');`;
    const insertIntoRooms = `INSERT IGNORE INTO rooms VALUES (default, \'${roomname}\');`;
    const insertIntoMessages = `INSERT INTO messages VALUES (
      default,
      (SELECT id FROM users WHERE username= ? ),` +
      " ? ," +
      `(SELECT id FROM rooms WHERE name= ? )
    );`;
    const queryArgs = [username, text, roomname];
    // You can import createUser method here to use but it doesn't return a promise
    // Maybe make that
    db.promise().query(checkForUser)
      .then(result => {
        return _.isEmpty(result[0][0]) // If there were no users found
          ? db.promise().query(insertIntoUsers)
          : db.promise().query(checkForRoom);
      })
      .then(result => {
        return !_.isEmpty(result[0]) // If you inserted into Users and didn't check Rooms
          ? db.promise().query(checkForRoom)
          : result; // you didn't check the rooms so pass on checkForRoomPromise
      })
      .then(result => {
        return _.isEmpty(result[0][0]) // if there were no rooms found
          ? db.promise().query(insertIntoRooms)
          : result; // you found a room and didn't need to insert into Rooms
      })
      .then(result => db.promise().query(insertIntoMessages, queryArgs))
      .then(result => callback(null, result[0]))
      .catch(err => callback(err, null));
  },
};
