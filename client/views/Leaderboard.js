define("views/Leaderboard", function(require, exports, module) {

  var Surface = require("meteor/helpers/Surface");

  var leaderboardSurface = new Surface({
    size: [undefined, 70],
    content: Template.leaderboard,
    classes: ['footer'],
    rendered: function(tmpl) {
      tmpl.click(function(e){
        if($(e.target).hasClass("inc")) {
          Players.update(Session.get("selected_player"), {$inc: {score: 5}});
        }
      });
    }
  });
  module.exports = leaderboardSurface;
});