
// Famous application main logic

Meteor.startup(function(){
  var Engine       = require('famous/core/Engine');
  var Modifier     = require("famous/core/Modifier");
  var Transform    = require("famous/core/Transform");
  var FastClick    = require("famous/inputs/FastClick");

  var HeaderComponent = require("iOS/HeaderComponent");

  var mainCtx = Engine.createContext();
  
  header = new HeaderComponent({
    content: "Header"
  });

  mainCtx.add(header);

  //mainCtx.add(new Modifier({origin:[.5,.5]})).add();

});

