const models = require('../models');
// const express = require('express');

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    // const queryString = 'select * from messages';
    // const queryArgs = [];
    models.messages.getAll((err, results) => {
      res.status(200).json(results).end();
    });
  },

  // a function which handles posting a message to the database
  post: function (req, res) {
    models.messages.create(req.body, (err, results) => {
      if (err) {
        console.error('THERE WAS AN ERROR', err);
      }
      res.status(201).json(results).end();
    });
  }
};
