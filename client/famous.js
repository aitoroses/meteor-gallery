if (Meteor.isClient) {

	Session.set("text", "some text");

	Famous.main(function(){
		var Engine = require("famous/engine");
		var Surface = famousHelpers.Surface;


		mainCtx = Engine.createContext();

		var surface = new Surface({
			size: [100, 100],
			classes: ["test-surface"],
			content: Template.test,
			data: "Template data"
		});

		mainCtx.add(surface);
	});

	Template.test.text = function() {
		return Session.get("text");
	}
}