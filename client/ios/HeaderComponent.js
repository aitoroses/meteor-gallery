define("iOS/HeaderComponent", function(require, exports, module) {
	
	var Scene = require('famous/core/Scene');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var Modifier = require("famous/core/Modifier");
	var View = require('famous/core/View');
	var Easing = require("famous/transitions/Easing");


	function HeaderComponent(options) {
		View.apply(this, arguments);

		this.title = new Surface({
			classes: this.options.classes,
			content: this.options.content,
			properties: {
				textAlign: "center"
			}
		});

		this.back = new Surface({
			size: [this.options.size[1], this.options.size[1]],
			classes: this.options.classes.concat(["ios-back-button"]),
			content: this.options.backContent
		});
		this.back.on("click", function() {
			this._eventOutput.emit("back", {});
			var curve = { curve: Easing.outBack, duration: 1000 }
			this.backModifier.setTransform(new Transform.translate(200,0,0), curve );
			this.backModifier.setOpacity(0, curve , function() {
				this.title.setContent(this.back.content);
			}.bind(this));
		}.bind(this));
		this.backModifier = new Modifier();

		this.next = new Surface({
			size: [this.options.size[1], this.options.size[1]],
			classes: this.options.classes.concat(["ios-next-button"]),
			content: this.options.nextContent
		});
		this.next.on("click", function() {
			this._eventOutput.emit("next", {});
			var curve = { curve: Easing.outBack, duration: 1000 }
			this.nextModifier.setTransform(new Transform.translate(-200,0,0), curve );
			this.nextModifier.setOpacity(0, curve , function() {
				this.title.setContent(this.next.content);
			}.bind(this));
		}.bind(this));
		this.nextModifier = new Modifier();

		this.layout = new Scene({
			id: "master",
			size: this.options.size,
			target: [
				{
					transform: Transform.inFront,
					origin: [0, .5],
					target: {id: "back"}
				},
				{
					origin: [.5, .5],
					target: this.title
				},
				{
					transform: Transform.inFront,
					origin: [1, .5],
					target: {id: "next"}
				}
			]
		});
		this.layout.id["back"].add(this.backModifier).add(this.back);
		this.layout.id["next"].add(this.nextModifier).add(this.next);

		this._add(this.layout);

		this._optionsManager.on("change", function(event){
			var key = event.id;
			var data = event.value;
			if( key == "size" ) {
				this.layout.id["master"].setSize(data);
				this.title.setSize(data);
				this.back.setSize([data[1], data[1]]);
                this.next.setSize([data[1], data[1]]);
			}
			else if (key === 'backClasses') {
                this.back.setOptions({classes: this.options.classes.concat(this.options.backClasses)});
            }
            else if (key === 'backContent') {
                this.back.setContent(this.options.backContent);
            }
            else if (key === 'classes') {
                this.title.setOptions({classes: this.options.classes});
                this.back.setOptions({classes: this.options.classes.concat(this.options.backClasses)});
                this.next.setOptions({classes: this.options.classes.concat(this.options.nextClasses)});
            }
            else if (key === 'content') {
                this.setContent(this.options.content);
            }
            else if (key === 'nextClasses') {
                this.next.setOptions({classes: this.options.classes.concat(this.options.nextClasses)});
            }
            else if (key === 'nextContent') {
                this.next.setContent(this.options.content);
            }
		}.bind(this));
	}

	HeaderComponent.prototype = Object.create(View.prototype);
	HeaderComponent.prototype.constructor = HeaderComponent;

	HeaderComponent.DEFAULT_OPTIONS = {
		size: [undefined, 50],
        backClasses: ['back'],
        backContent: 'BACK',
        classes: ['ios-header'],
        content: '',
        nextClasses: ['next'],
        nextContent: 'NEXT'
	};

	HeaderComponent.prototype.setContent = function setContent(content) {
        return this.title.setContent(content);
    };

    module.exports = HeaderComponent;
});