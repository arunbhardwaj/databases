var express = require('express');
var db = require('./db');
const Sequelize = require('sequelize');
/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */

// Middleware
var morgan = require('morgan');
var cors = require('cors');

// Router
var router = require('./routes.js');

/// Sequelize Method ///

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
// For Sequelize
// db.sequelize.sync().then((req) => {
//   app.listen(app.get('port'), () => {
//     console.log('Listening on', app.get('port'));
//   });
// });

