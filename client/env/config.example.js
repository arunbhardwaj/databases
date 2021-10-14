// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', 'GITHUB_API_TOKEN');
});

// Put your campus prefix here
window.CAMPUS = 'FILL_ME_IN';

//$('.chat div:not(.username)').text('KellyWazHere');
// var noun = ['elephants', 'giraffes', 'crows', 'tigers', 'people', 'plants', 'trees'];
// var verb = ['eat', 'cannot see', 'trip over', 'are romantically involved with', 'absolutely hate'];
// $('.chat div:not(.username)').text('I heard that ' + noun[Math.floor(Math.random() * noun.length)] + ' ' + verb[Math.floor(Math.random() * verb.length)] + ' ' + noun[Math.floor(Math.random() * noun.length)]);
//$('.username').text('KellyWazHere');