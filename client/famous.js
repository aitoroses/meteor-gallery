if (Meteor.isClient) {

	Session.set("text", "some text");

	Famous.main(function(){
		var Engine = require("famous/engine");
		var Surface = require("famous/surface");


			mainCtx = Engine.createContext();

			// Create a surface using a Meteor template
			var surface = new Surface({
				size: [100, 100],
				classes: ["test-surface"],
			});

			var r = UI.render(Template.test);
			html = r.dom.members[1];
			Meteor.defer(function(){
				$(".test-surface").append(r.dom.members[1]);
			});

			mainCtx.add(surface);
			// debugger
	});

	Template.test.text = function() {
		return Session.get("text");
	}
}