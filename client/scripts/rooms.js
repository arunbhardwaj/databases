// This object houses all the room _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Rooms = {

  _data: new Set(),

  // Add rooms
  add: (roomName, $selectTag) => {
    if (!Rooms._hasRoom(roomName) && roomName !== null) {
      Rooms._data.add(roomName);
      // RoomsView.renderRoom(roomName);
      var roomObj = {'room': roomName};
      $(RoomView.render(roomObj)).prependTo($selectTag);
    }
  },

  _getRooms: () => {
    return Rooms._data;
  },

  _hasRoom: (roomName) => {
    return Rooms._getRooms().has(roomName);
  },

  // Update the list of rooms to the View
  _updateList: ($selectTag) => {
    var messages = Messages._getAllMessages();
    for (let id in messages) {
      let room = messages[id].roomname;
      Rooms.add(room, $selectTag);
    }
  },

  // Mark a room as selected
  // $("select.room-options").change(function(){
  //   // $("").children("option:selected").val();
  // });


};