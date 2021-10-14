/*
Whereas MessagesView controls the entire list of messages,
MessageView is responsible for rendering a single message.
Learn more about Underscore's templating capability
here: https://underscorejs.org/#template.
*/

var MessageView = {
  render: _.template(`
      <div class="chat">
        <div class="username"><%- username %></div>
        <div> <%- text %> </div>
      </div>
    `)
};

/* Format
var compiled = _.template("hello: <%= name %>");

Invocation
compiled({name: 'moe'});

Output:
=> "hello: moe"
*/