// This object houses all the friend _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Friends = {
  // TODO: Define how you want to store your list of friends.

  _data: {},

  // TODO: Define methods which allow you to add, toggle,
  // and check the friendship status of other users.
  check: (username) => {
    return (Friends._data[username] === undefined) ? false : true;
  },

  isFriend: (username) => {
    return Friends._data[username];
  },

  add: (username) => {
    Friends._data[username] = true;
  },

  toggleStatus: (username) => {
    if (Friends.check(username)) {
      Friends._data[username] = !Friends._data[username];
    } else {
      Friends._data[username] = true;
    }
  }

};