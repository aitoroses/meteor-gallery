
Scenes.home = function() {

	var Engine = require('famous/engine');
  var Surface = famousHelpers.Surface;
  var Modifier = require('famous/modifier');
  var Matrix = require('famous/transform');
  var ScrollView = require('famous/views/scrollview');
  var HeaderFooterLayout = require('famous/views/header-footer-layout')
  
  var mainCtx = Engine.createContext();
  
  // Create a 3 horitzontal paned layout
  layout = new HeaderFooterLayout({
    headerSize: 70,
    footerSize: 0
  });

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
  famousHelpers.cursorToArray(
    Players.find({}, {sort: {score: -1, name: 1}}),
    surfaces,
    createSurface
  );

  // Include the surfaces in the scrollview and pipe
  // events to it from the engine
  scrollView.sequenceFrom(surfaces);
  Engine.pipe(scrollView);

  // Link the scrollview to the layout and add the footer

  var HeaderSurface = new Surface({
    size: [undefined, 70],
    content: Template.leaderboard,
    classes: ['footer'],
  });

  // Menu icon Surface

  // var ImageSurface = require("famous/surface");

  // var MenuIcon = new ImageSurface({
  //   size: [200, 200],
  //   content: '<img src="http://www.tuexperto.com/wp-content/uploads/2013/02/chrome.jpg">'
  // });

  //HeaderSurface.add(MenuIcon);

  layout.id.content.link(scrollView);
  layout.id.header.link(HeaderSurface);

  mainCtx.link(layout);

};