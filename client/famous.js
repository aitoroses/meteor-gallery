
Meteor.startup(function(){
  var Engine = require('famous/core/Engine');
  var Surface = famousHelpers.Surface;
  var ContainerSurface = require("famous/surfaces/ContainerSurface");
  var Modifier = require('famous/core/Modifier');
  var Matrix = require('famous/core/Transform');
  var EasingCurves = require('famous/transitions/Easing');
  var ScrollView = require('famous/views/Scrollview');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var FastClick = require("famous/inputs/FastClick");
  
  var mainCtx = Engine.createContext();
  
  // Create a 3 horitzontal paned layout
  layout = new HeaderFooterLayout({
    headerSize: 70,
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

  var headerSurface = new Surface({
    size: [undefined, 70],
    content: Template.headerTemplate,
    classes: ["header"],
    properties: {
      textAlign: "center",
      lineHeight: 70 + "px",
      fontSize: "32px",
      backgroundColor: "rgb(255, 73, 73)",
      color: "white",
      fontFamily: "Sans-Serif"
    },
  });

  // Create a slider surface with a scrollview 
  //and some elements

  var sliderBtn = new Surface({
    content: "<button>menu</button>"
  });
  sliderSize = 200;
  var slider = new Surface({
    size: [sliderSize, window.innerHeight],
    properties: {
      backgroundColor: "gray",
      textAlign: "center",
    },
    content: "Slider"
  });

  var sliderStartPos = Matrix.translate(-sliderSize,0,0);
  var sliderEndPos = Matrix.translate(0,0,0);
  var headerStartPos = Matrix.translate(0,0,0);
  var headerEndPos = Matrix.translate(sliderSize,0,0);
  var sliderModifier = new Modifier({
    transform: sliderStartPos
  });
  var headerModifier = new Modifier({
    transform: headerStartPos
  });
  var easeTransition = { duration: 400, curve: EasingCurves.inOutBackNorm };
  var fastEaseTransition = { duration: 400, curve: EasingCurves.inOutBackNorm };
  
  sliderBtn.on("click", function(){
    sliderModifier.setTransform(sliderEndPos, fastEaseTransition);
    headerModifier.setTransform(headerEndPos, easeTransition);
    sliderStartPos = [sliderEndPos, sliderEndPos = sliderStartPos][0];
    headerStartPos = [headerEndPos, headerEndPos = headerStartPos][0];
  });

  var headerContainer = new ContainerSurface({
    size: [undefined, 70]
  });
  headerContainer.add(headerSurface);
  headerContainer.add(sliderBtn);

  layout.header.add(headerModifier).add(headerContainer);
  layout.content.add(scrollView);
  layout.footer.add(leaderboardSurface);

  mainCtx.add(layout);
  mainCtx.add(sliderModifier).add(slider);

});

