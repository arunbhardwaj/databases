const {Message, User, Room} = require('../db');
const sequelize = require('sequelize');

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    Message.findAll({
      attributes: ['UserId', 'text', 'createdAt'],
      include: [{
        model: User,
        attributes: ['username']
      },
      {
        model: Room,
        attributes: ['roomname']
      }]
    })
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
        // console.log('user is>>>>>>>>>>>>', user[0].dataValues);
        Room.findOrCreate({
          where: {roomname},
          defaults: {
            roomname: roomname || 'default'
          }
        })
          .then(room => {
            // console.log('room is >>>>>>>>>>>>>>>>>>', room);
            Message.create({UserId: user[0].dataValues.id, text, RoomId: room[0].dataValues.id })
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
