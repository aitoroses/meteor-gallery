(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/famous/include.js                                        //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
function loadScript(name, onload) {                                  // 1
  var src = Famous._basePath + '/' + name;                           // 2
  var script = document.createElement("script");                     // 3
  script.src = src;                                                  // 4
  script.onload = onload;                                            // 5
  script.onerror = function() {                                      // 6
    console.log('Famous: Error fetching ' + src)                     // 7
  };                                                                 // 8
  document.head.appendChild(script);                                 // 9
}                                                                    // 10
                                                                     // 11
Famous = {                                                           // 12
  _basePath: '/packages/famous',                                     // 13
  load: function(callback) {                                         // 14
    loadScript('build.js', function() {                              // 15
      // done loading and configuring requirejs                      // 16
      if (typeof callback == 'function')                             // 17
        callback();                                                  // 18
    });                                                              // 19
  },                                                                 // 20
  main: function(cb) {                                               // 21
    this.load(function() {                                           // 22
      // famous is loaded                                            // 23
      Meteor.startup(function() {                                    // 24
        var foo = require(['index.js']);                             // 25
        cb(require);                                                 // 26
      });                                                            // 27
    })                                                               // 28
  }                                                                  // 29
}                                                                    // 30
                                                                     // 31
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/famous/famousHelpers.js                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
famousHelpers = {}                                                   // 1
                                                                     // 2
var createSurface = function(s) {                                    // 3
                                                                     // 4
	var Surface = require("famous/surface");                            // 5
                                                                     // 6
	var r;                                                              // 7
	if (s.data) {                                                       // 8
		r = UI.renderWithData(s.content, s.data);                          // 9
	} else {                                                            // 10
		r = UI.render(s.content);                                          // 11
	}                                                                   // 12
	htmlNodes = r.dom.getNodes();                                       // 13
	var node;                                                           // 14
	if (htmlNodes.length == 3) {                                        // 15
		node = r.dom.members[1];                                           // 16
	} else {                                                            // 17
		var node = document.createElement("div");                          // 18
		for (var i = 1; i < htmlNodes.length; i++) {                       // 19
			node.appendChild(htmlNodes[i]);                                   // 20
		}                                                                  // 21
	}                                                                   // 22
  // var node = document.createElement("div");                       // 23
  // UI.insert(r, node);                                             // 24
                                                                     // 25
	var surface = new Surface({                                         // 26
		size: s.size,                                                      // 27
		classes: s.classes,                                                // 28
		content: node                                                      // 29
	});                                                                 // 30
                                                                     // 31
  // attach events to the surface                                    // 32
  if (s.events != null) {                                            // 33
    for (var k in s.events) {                                        // 34
      if (s.events.hasOwnProperty(k)) {                              // 35
        surface.on(k, s.events[k]);                                  // 36
      }                                                              // 37
    }                                                                // 38
  }                                                                  // 39
                                                                     // 40
  // Rendered callback                                               // 41
  if (typeof s.rendered == "function") {                             // 42
    s.rendered($(node));                                             // 43
  }                                                                  // 44
                                                                     // 45
  return surface;                                                    // 46
}                                                                    // 47
                                                                     // 48
var cursorToArray = function(cursor, data, createFn) {               // 49
  cursor.observe({                                                   // 50
    addedAt: function(document, atIndex, before) {                   // 51
      data.splice(atIndex, 0, createFn(document));                   // 52
    },                                                               // 53
    changedAt: function(newDocument, oldDocument, atIndex) {         // 54
      // ensure the fragment createFn returns is re-active           // 55
      data[atIndex] = createFn(newDocument);                         // 56
    },                                                               // 57
    removedAt: function(oldDocument, atIndex) {                      // 58
      data.splice(atIndex, 1);                                       // 59
    },                                                               // 60
    movedTo: function(document, fromIndex, toIndex, before) {        // 61
      var item = data.splice(fromIndex, 1)[0];                       // 62
      data.splice(toIndex, 0, item);                                 // 63
    }                                                                // 64
  });                                                                // 65
}                                                                    // 66
                                                                     // 67
famousHelpers.Surface = createSurface;                               // 68
famousHelpers.cursorToArray = cursorToArray;                         // 69
///////////////////////////////////////////////////////////////////////

}).call(this);
