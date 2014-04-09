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
	return new Surface({
		size: s.size,
		classes: s.classes,
		content: node
	});
}

famousHelpers.Surface = createSurface;