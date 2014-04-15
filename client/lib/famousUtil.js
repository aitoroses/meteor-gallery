// -- meteor/helpers/Surface: Wrapper around Famous Surfaces that accepts templates, rendered callback, data context and so on
// -- meteor/helpers/CursorToArray: Cursor to array reactive mapper

define("famono/util/Surface", function(require,exports,module) {

  var createSurface = function(s) {

    var Surface = require("famous/core/Surface");

    var surface;
    
    if (typeof s.content == "string") {
      return new Surface(s);
    }

    // Else we should return a reactive Meteor fragment
  	var r;
    // Just render using Meteor UI
    // Accepts data and it's reactive
  	if (s.data) {
  		r = UI.renderWithData(s.content, s.data);
  	} else {
  		r = UI.render(s.content);
  	}
  	htmlNodes = r.dom.getNodes();
  	var node;
    // If there are 3 nodes, they should be 2 text nodes on the boundaries
    // But in reality we only need the middle one
  	if (htmlNodes.length == 3) {
  		node = r.dom.members[1];
  	} else {
  		var node = document.createElement("div");
  		for (var i = 1; i < htmlNodes.length; i++) {
  			node.appendChild(htmlNodes[i]);
  		}
  	}

    // -- We also can use the UI packages insert method to append the template,
    // -- but for now gonna keep like this
    // var node = document.createElement("div");
    // UI.insert(r, node);

    // Create a Famo.us Surface using Meteors rendered node
  	surface = new Surface({
  		size: s.size,
  		classes: s.classes,
      properties: s.properties,
  		content: node
  	});

    // attach events to the surface
    if (s.events != null) {
      for (var k in s.events) {
        if (s.events.hasOwnProperty(k)) {
          surface.on(k, s.events[k]);
        }
      }
    }

    // Rendered callback
    if (typeof s.rendered == "function") {
      s.rendered($(node));
    }

    return surface;
  }

  module.exports = createSurface;

});

define("famono/util/CursorToArray", function(require,exports,module) {

  var cursorToArray = function(cursor, data, createFn) {
    cursor.observe({
      addedAt: function(document, atIndex, before) {
        data.splice(atIndex, 0, createFn(document));
      },
      changedAt: function(newDocument, oldDocument, atIndex) {
        // ensure the fragment createFn returns is re-active
        data[atIndex] = createFn(newDocument);
      },
      removedAt: function(oldDocument, atIndex) {
        data.splice(atIndex, 1);
      },
      movedTo: function(document, fromIndex, toIndex, before) {
        var item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
      }
    });
  }

  module.exports = cursorToArray;
});