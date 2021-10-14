/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */
const models = require('../models');
const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect((err) => {
      if (err) {
        console.log('error is: ', err);
      }
    });

    const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done); //Doesn't work if table has constraint foreign keys
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const text = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, text, roomname });
      })
      .then(() => {
        const queryString = 'SELECT * FROM messages where messages.text = ? ';
        const queryArgs = [message];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
    const username = 'Arun';
    const text = 'Some random message';
    const roomname = 'Temp';
    const getRoomNameFromId = 'select name from rooms where id = ? ';

    models.messages.create({text: text, roomname: roomname, username: username}, (err, results) => {
      if (err) {
        throw err;
      }
      const getMessageFromText = 'select * from messages where messages.text = ?';
      dbConnection.promise().query(getMessageFromText, text)
        .then((response) => {
          const messageReceived = response[0][0];
          expect(messageReceived.text).toEqual(text);
          const roomId = messageReceived.roomname_id;
          dbConnection.promise().query(getRoomNameFromId, roomId)
            .then((result) => {
              expect(result[0][0].name).toEqual(roomname);
            })
            .catch((err) => {
              throw err;
            });
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
    // dbConnection.query(queryString, queryArgs, (err) => {
    //   if (err) {
    //     throw err;
    //   }

    //   // Now query the Node chat server and see if it returns the message we just inserted:
    //   axios.get(`${API_URL}/messages`)
    //     .then((response) => {
    //       const messageLog = response.data;
    //       expect(messageLog[0].text).toEqual(message);
    //       expect(messageLog[0].roomname).toEqual(roomname);
    //       done();
    //     })
    //     .catch((err) => {
    //       throw err;
    //     });
    // });
  });
});
