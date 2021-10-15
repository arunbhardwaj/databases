var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var cors = require('cors');

// Router
var router = require('./routes.js');

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('MySQL was connected successfully.');
  }
});

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Set up our routes
app.use('/classes', router);

// Serve the client files
app.use(express.static(__dirname + '/../'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

