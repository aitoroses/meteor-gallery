if (Meteor.isClient) {

	Session.set("text", "some text");

	Famous.main(function(){
		var Engine = require("famous/engine");
		var Surface = famousHelpers.Surface;
		var Modifier = require('famous/modifier');
		var Matrix = require('famous/transform');
		var EasingCurves = require('famous/transitions/easing');


		mainCtx = Engine.createContext();

		var surface = new Surface({
			size: [100, 100],
			classes: ["test-surface"],
			content: Template.test,
			data: "Template data"
		});

		// Define Matrix transforms for start/end positions
		// and an easing curve to transition between them
		var startPos = Matrix.translate(50,50,0);
		var endPos = Matrix.translate(200,300,0);
		var transform = new Modifier({transform: startPos});
		var easeTransition = { duration: 800, curve: EasingCurves.inOutBackNorm };

		// Apply the transition on click and switch start/end
		surface.on('click', function(e) {
			transform.setTransform(endPos, easeTransition);
			startPos = [endPos, endPos = startPos][0];
		});

		  mainCtx.add(transform).link(surface);
	});

	Template.test.text = function() {
		return Session.get("text");
	}
}