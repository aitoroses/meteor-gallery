define("app/views/ToggleButton", function(require,exports,module) {
  
  var ToggleButton = require('famous/widgets/ToggleButton');

  var MyButton = function(options) {
    this.options = {
      size: undefined,
      onContent: "",
      offContent: "",
      offClasses: ["off"],
      onClasses: ["on"],
      properties: {
        fontFamily: "Helvetica Neue",
        fontSize: "24px",
        textAlign: "center",
        color: "white",
      },
      outTransition: {curve: 'easeInOut', duration: 300},
      inTransition: {curve: 'easeInOut', duration: 300},
      toggleMode: ToggleButton.TOGGLE,
      crossfade: true
    };

    this._toggleButton = new ToggleButton();

    if (options) this.setOptions(options);
  }

  MyButton.prototype._updateOptions = function _updateOptions() {
    this._toggleButton.setOptions(this.options);
    this._toggleButton.onSurface.setContent(this.options.onContent);
    this._toggleButton.offSurface.setContent(this.options.offContent);
    this._toggleButton.onSurface.setProperties(this.options.properties);
    this._toggleButton.offSurface.setProperties(this.options.properties);
  }

  MyButton.prototype.setOnContent = function setOnContent(content) {
    this.options.onContent = content;
  }

  MyButton.prototype.setOffContent = function setOffContent(content) {
    this.options.offContent = content;
  }
  MyButton.prototype.setSize = function setSize(size) {
    this.options.size = size;
    this.options.properties.lineHeight = size[1] + "px";
  }

  MyButton.prototype.setOptions = function setOptions(options) {
    if (options.onContent !== undefined) {
      this.setOnContent(options.onContent);
    }
    if (options.offContent !== undefined) {
      this.setOffContent(options.offContent);
    }
    if (options.size !== undefined) {
      this.setSize(options.size);
    }
    this._updateOptions();
  }

  MyButton.prototype.getSize = function size() {
    return this.options.size;
  }

  MyButton.prototype.render = function render() {
    return this._toggleButton.render();
  }

  module.exports = MyButton;
  
});