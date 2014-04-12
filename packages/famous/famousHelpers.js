famousHelpers = {}

var createSurface = function(s) {

	var Surface = require("famous/surface");

	var r;
	if (s.data) {
		r = UI.renderWithData(s.content, s.data);
	} else {
		r = UI.render(s.content);
	}
	htmlNodes = r.dom.getNodes();
	var node;
	if (htmlNodes.length == 3) {
		node = r.dom.members[1];
	} else {
		var node = document.createElement("div");
		for (var i = 1; i < htmlNodes.length; i++) {
			node.appendChild(htmlNodes[i]);
		}
	}
  // var node = document.createElement("div");
  // UI.insert(r, node);

	var surface = new Surface({
		size: s.size,
		classes: s.classes,
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

famousHelpers.Surface = createSurface;
famousHelpers.cursorToArray = cursorToArray;