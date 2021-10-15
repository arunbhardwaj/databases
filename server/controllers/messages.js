const {Message, User, Room} = require('../db');

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    Message.findAll({include: [User, Room]})
      .then((results) => {
        res.json(results).status(200);
      })
      .catch(err => {
        console.error(err);
      });
  },

  // a function which handles posting a message to the database
  post: function (req, res) {
    let {username, text, roomname} = req.body;
    User.findOrCreate({
      where: {username: username },
      defaults: {
        username: username || 'anonymous'
      }
    })
      .then((user) => {
        Room.findOrCreate({
          where: {roomname},
          defaults: {
            roomname: roomname || 'default'
          }
        })
          .then(room => {
            Message.create({userid: user.id, text, roomname: room.roomname })
              .then(results => {
                res.sendStatus(201);
              })
              .catch(err => {
                console.error(err);
              });
          });
      })
      .catch(err => {
        console.error(err);
      });
  }
};
