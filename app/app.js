var SnowStorm = require('./snow-storm');

class App {
  constructor(_opts) {
    var opts = Object.assign({
      rootElementID: 'root',
      flakeCount: 100
    }, _opts || {});

    var rootElement = document.getElementById(opts.rootElementID);

    Object.defineProperties(this, {
      _options: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: opts
      },
      _rootElement: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: rootElement
      },
      _lastRenderTime: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: null
      },
      _renderFunc: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: this.render.bind(this)
      },
    });

    Object.defineProperties(this, {
      _storm: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: new SnowStorm(this.getRootElement(), this.getFlakeCount())
      }
    });

    window.requestAnimationFrame(this._renderFunc);
  }

  getRootElement() {
    return this._rootElement;
  }

  getFlakeCount() {
    return this._options.flakeCount;
  }

  render(time) {
    var deltaMS = (!this._lastRenderTime) ? 1 : time - this._lastRenderTime;
    this._lastRenderTime = time;

    if (!global.pauseAnimations)
      this._storm.update(deltaMS / 1000);

    window.requestAnimationFrame(this._renderFunc);
  }
}

module.exports = App;
