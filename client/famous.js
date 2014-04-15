
// Famous application main logic

Meteor.startup(function(){
  var Engine = require('famous/core/Engine');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var FastClick = require("famous/inputs/FastClick");

  var NavigationBar = require('famous/widgets/NavigationBar');
  
  var mainCtx = Engine.createContext();
  
  // Create a 3 horitzontal paned layout
  layout = new HeaderFooterLayout({
    headerSize: 70,
    footerSize: 70
  });

  var scrollView          = require("views/PlayersScroll");
  var leaderboardSurface  = require("views/Leaderboard");
  
  var headerContainer     = require("views/Header").headerContainer;
  var headerModifier      = require("views/Header").headerModifier;
  var slider              = require("views/Header").slider;
  var sliderModifier      = require("views/Header").sliderModifier;

  // Link the scrollview to the layout and add the footer
  layout.header.add(headerModifier).add(headerContainer);
  layout.content.add(scrollView);
  layout.footer.add(leaderboardSurface);

  mainCtx.add(layout);
  mainCtx.add(sliderModifier).add(slider);

});

