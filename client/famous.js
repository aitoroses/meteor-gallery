if (Meteor.isClient) {

	Session.set("text", "some text");

	Famous.main(function(){
		var Engine = require("famous/engine");
		var Surface = require("famous/surface");


			mainCtx = Engine.createContext();

			// var r = UI.render(Template.test);
			// html = r.dom.members[1];
			// debugger

			// // Create a surface using a Meteor template
			// var surface = new Surface({
			// 	size: [100, 100],
			// 	classes: ["test-surface"],
			// 	content: r.dom.getNodes()
			// });

			function createSurface(s) {
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

			var surface = createSurface({
				size: [100, 100],
				classes: ["test-surface"],
				content: Template.test,
				data: "Template data"
			});

			mainCtx.add(surface);
			// debugger
	});

	Template.test.text = function() {
		return Session.get("text");
	}
}