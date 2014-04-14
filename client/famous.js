
Meteor.startup(function(){
  var Engine = require('famous/core/Engine');
  var Surface = famousHelpers.Surface;
  var Modifier = require('famous/core/Modifier');
  var Matrix = require('famous/core/Transform');
  var ScrollView = require('famous/views/Scrollview');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  
  var mainCtx = Engine.createContext();
  
  // Create a 3 horitzontal paned layout
  layout = new HeaderFooterLayout({
    headerSize: 0,
    footerSize: 70
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

  layout.content.add(scrollView);
  layout.footer.add(leaderboardSurface);

  var test = new Surface({
    size: [200, 200],
    properties: {
      backgroundColor: "gray",
      textAlign: "center",
      lineHeight: "200px",
    },
    content: "Surface test"
  });

  mainCtx.add(layout);
  mainCtx.add(test);

});

