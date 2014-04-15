define("app/Header", function(require, exports, module) {

  var Surface           = require("famono/util/Surface");
  var ContainerSurface  = require("famous/surfaces/ContainerSurface");
  var Modifier          = require('famous/core/Modifier');
  var Matrix            = require('famous/core/Transform');
  var EasingCurves      = require('famous/transitions/Easing');

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

  module.exports = {
    headerContainer : headerContainer,
    headerModifier  : headerModifier,
    sliderModifier  : sliderModifier,
    slider          : slider,
  }
});