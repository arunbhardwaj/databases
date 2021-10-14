// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),
  $selected: $('#rooms select'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    // imports methods
    FormView.initialize();
    MessagesView.initialize();
    RoomsView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();

    // TODO: Make sure the app loads data from the API
    // continually, instead of just once at the start.
    setInterval(() => {
      App.fetch(() => {
        MessagesView.render(App.$selected.val());
        RoomsView.render();
        App.stopSpinner();
      });
    }, 5000);

    // setInterval(() => {
    //   console.log('calling fetch a user');
    //   App.fetchAUser();
    //   App.stopSpinner();
    // }, 10000);

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      Messages._store(data);
    });
    callback();
  },

  fetchAUser: function(user, callback = ()=>{}) {
    Parse.readAUser(user);
    callback();
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
