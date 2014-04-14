Scenes.test = function() {
  var Engine = require('famous/engine');
  var Surface = require('famous/surface');
  var Modifier = require('famous/modifier');

  var mainCtx = Engine.createContext();

  var surface = new Surface({
    size: [200, 200],
    content: "<p>Surface</p>",
    classes: ["test-surface"],
  });

  mainCtx.add(new Modifier({origin : [.5,.5]})).link(surface);
}
