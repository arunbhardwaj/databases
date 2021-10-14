// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', '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');
});

// Put your campus prefix here
window.CAMPUS = 'hr-nyc';
