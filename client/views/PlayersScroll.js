
define("views/PlayersScroll", function(require, exports, module) {

  var Engine = require("famous/core/Engine");
  var Surface = require("meteor/helpers/Surface");
  var ScrollView = require('famous/views/Scrollview');
  var CursorToArray = require("meteor/helpers/CursorToArray");


  // Create a scrollview and array to hold surfaces
  var scrollView = new ScrollView();
  var surfaces = [];

  // Create a surface based on data in document
  function createSurface(doc) {
    var surface = new Surface({
      size: [undefined, 50],
      content: Template.player,
      classes: ["test-surface"],
      data: doc,
      events: {
        click: function() {
          Session.set("selected_player", doc._id);
        }
      }
    });
    return surface;
  }
  
  // Re-actively maintain the surfaces array as players change.
  CursorToArray(
    Players.find({}, {sort: {score: -1, name: 1}}),
    surfaces,
    createSurface
  );

  // Include the surfaces in the scrollview and pipe
  // events to it from the engine
  scrollView.sequenceFrom(surfaces);
  Engine.pipe(scrollView);

  module.exports = scrollView;

});