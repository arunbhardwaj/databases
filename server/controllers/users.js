var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, results) => {
      if (err) {
        res.sendStatus(404);
        console.error('THERE WAS AN ERROR <<<', err);
      }
      res.send(results);
      res.sendStatus(200);
    });
  },
  post: function (req, res) {
    // models.users.create()
    let body = req.body;
    models.users.create(req.body, (err, results) => {
      if (err) {
        res.sendStatus(404);
        console.error('THERE WAS AN ERROR <<<', err);
      }
      // res.sendStatus(201); // This sets headers apparently -> "[ERR_HTTP_HEADERS_SENT]: CANNOT SET HEADERS AFTER THEY ARE SENT TO THE CLIENT"
      res.status(201).json(results);
      // res.send(results);
    });
  }
};
