// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

var MessagesView = {

  $chats: $('#chats'),
  _prevID: new Set(),
  users: $('.username'),

  initialize: function() {
    this.render();
    $('#chats').delegate('.username', 'click', this.handleClick);
  },

  render: function(roomName) {
    let messages = Messages._getAllMessages();

    // render only if new messages are added.
    // Render differently if roomName is specified
    for (let id in messages) {
      var message = messages[id];
      if (arguments.length === 1) {
        if (!MessagesView._prevID.has(id) && message.roomname === roomName) {
          MessagesView.renderMessage(message);
          MessagesView._prevID.add(id);
        }
      } else {
        if (!MessagesView._prevID.has(id)) {
          MessagesView.renderMessage(message);
          MessagesView._prevID.add(id);
        }
      }
    }
  },

  // TODO: implement this differently such that we don't have to empty chat every time
  derenderRoom: function(room) {
    this.$chats.empty();
    this._prevID = new Set();
  },

  // Render a single message
  renderMessage: function(message) {
    var templateMessage = $(MessageView.render(message));
    templateMessage.prependTo(this.$chats);

    // TODO: get the DOM to change the color for friends immediately after
    // friending or defriending instead of having us to load up a different
    // room.
    if (Friends.isFriend(message.username)) {
      templateMessage.addClass('friend');
    } else {
      templateMessage.removeClass('friend');
    }
  },

  // handles a user clicking on a message which adds the sender to the user's friend list.
  handleClick: function(event) {
    var username = $(this).text();
    Friends.toggleStatus(username);
  }

};