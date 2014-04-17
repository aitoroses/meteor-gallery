
// Famous application main logic

Meteor.startup(function(){
  var Engine       = require('famous/core/Engine');
  var Modifier     = require("famous/core/Modifier");
  var FastClick    = require("famous/inputs/FastClick");
  var ToggleButton  = require("app/views/ToggleButton");

  var mainCtx = Engine.createContext();
  
  toggleButton = new ToggleButton({
    onContent: "ON",
    offContent: "OFF",
    size: [200, 200],
  });


  mainCtx.add(new Modifier({origin:[.5,.5]})).add(toggleButton);

});

