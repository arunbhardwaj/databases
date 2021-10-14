// This object houses all the message _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Messages = {

  // TODO: Define how you want to store your messages.
  _data: {},

  // TODO: Define methods which allow you to retrieve from,
  // add to, and generally interact with the messages.
  _store: function(messages, callback = ()=>{}) {
    for (var message of messages) {
      this.addMessage(message);
    }
    callback(Messages._data);
  },

  addMessage: (message) => {
    Messages._data[message.id] = message;
  },

  _getAllMessages: function() {
    return this._data;
  }

};