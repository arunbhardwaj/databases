const models = require('../models');
const {Message, User, Room} = require('../db');
// const express = require('express');

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    // const queryString = 'select * from messages';
    // const queryArgs = [];
    Message.findAll({include: [User, Room]})
      .then((results) => {
        res.json(results).status(200);
      })
      .catch(err => {
        console.error(err);
      });


    // models.messages.getAll((err, results) => {
    //   res.status(200).json(results).end();
    // });
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



    // models.messages.create(req.body, (err, results) => {
    //   if (err) {
    //     console.error('THERE WAS AN ERROR', err);
    //   }
    //   res.status(201).json(results).end();
    // });
  }
};
