var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

var Room = db.define('Room', {
  roomname: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

var Message = db.define('Message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

User.hasMany(Message, {foreignKey: {name: 'UserId', allowNull: false}, onDelete: 'CASCADE'});
Room.hasMany(Message, {foreignKey: 'RoomId'});
Message.belongsTo(User, {foreignKey: {name: 'UserId', allowNull: false}, onDelete: 'CASCADE'});
Message.belongsTo(Room, {foreignKey: 'RoomId'});

// User.sync();
// Room.sync();
// Message.sync();
db.sync();

exports.User = User;
exports.Room = Room;
exports.Message = Message;

// db.close();