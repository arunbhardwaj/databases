// RoomsView is an object which controls the DOM elements
// responsible for displaying and selecting rooms.

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),
  $chats: $('#chats'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
    RoomsView.$select.change(RoomsView.handleChange);
    RoomsView.$button.on('click', RoomsView.handleClick);
    RoomsView.render();
  },

  render: function() {
    // TODO: Render out the list of rooms.
    // Why do we pass in $select?
    Rooms._updateList(this.$select);

  },

  // Renders out a single room.
  renderRoom: function(roomName) {
    MessagesView.derenderRoom(roomName);
    MessagesView.render(roomName);
  },

  // Handles a user selecting a different room.
  handleChange: function(event) {
    var room = RoomsView.$select.val();
    RoomsView.renderRoom(room);
  },

  handleClick: function(event) {
    // TODO: Make this function actually send a room to the Parse API.
    var roomName = prompt('Add a room');
    if (roomName) {
      var $option = $('<option>').val(roomName).text(roomName);
      RoomsView.$select.append($option);
      RoomsView.renderRoom(roomName);
    }

  }

};
