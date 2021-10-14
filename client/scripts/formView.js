// FormView is an object which houses all the message form functionality.
// Consider the provided code and complete the functionality.
// Apply what you learn here to other interactive views if necessary.

var FormView = {

  $form: $('form'),
  $selected: $('#rooms select'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    var message = {
      username: App.username,
      text: $('#message').val(),
      roomname: FormView.$selected.val(),
    };

    Parse.create(message, () => {
      // Fetching with rendering only way to get messages to appear right after submission.
      // App.fetch(() => MessagesView.render(FormView.$selected.val()));
      MessagesView.render(FormView.$selected.val());
      console.log('Message sent');
    }, () => {
      console.log('Message not sent');
    });
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};