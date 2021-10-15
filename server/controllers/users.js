const {Message, User, Room} = require('../db');

module.exports = {
  get: function (req, res) {
    User.findAll()
      .then((results) => {
        res.json(results).status(200);
      })
      .catch(err => {
        console.error(err);
      });
  },
  post: function (req, res) {
    let {username} = req.body;
    User.create({username})
      .then(results => res.sendStatus(201))
      .catch(err => console.error(err));
  }
};
