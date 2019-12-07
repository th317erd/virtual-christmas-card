var Vector    = require('./vector'),
    SnowFlake = require('./snow-flake'),
    utils     = require('./utils');

var DEFAULT_FLAKE_COUNT = 100;

class SnowStorm {
  constructor(parentElement, _flakeCount) {
    var flakeCount  = _flakeCount,
        velocityScalar = 1;

    if (_flakeCount instanceof SnowStorm) {
      var snowStorm = _flakeCount;

      flakeCount = snowStorm.getFlakeCount();
      velocityScalar = snowStorm.getVelocityScalar();
    }

    Object.defineProperties(this, {
      id: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: utils.genID('storm')
      },
      _parentElement: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: parentElement
      },
      _flakeLookupTable: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: {}
      },
      _flakeCount: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: flakeCount || DEFAULT_FLAKE_COUNT
      },
      _velocityScalar: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: velocityScalar
      }
    });

    var element = utils.createElement(parentElement, {
          id: this.id,
          class: 'snowstorm'
        }),
        flakes;

    if (_flakeCount instanceof SnowStorm) {
      var snowStorm = _flakeCount;
      flakes = snowStorm.getFlakes().slice().map((flake) => flake.clone(element));
    } else {
      flakes = this.generateFlakes(flakeCount || DEFAULT_FLAKE_COUNT, element);
    }

    Object.defineProperties(this, {
      _element: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: element
      },
      _flakes: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: flakes
      }
    });
  }

  destroy() {
    utils.removeElement(this.getElement());
  }

  getElement() {
    return this._element;
  }

  getParentElement() {
    return this.getElement().parentNode;
  }

  getFlakeCount() {
    return this._flakeCount;
  }

  getFlakes() {
    return this._flakes;
  }

  getVelocityScalar() {
    return this._velocityScalar;
  }

  generateFlakes(count, _parentElement) {
    var flakes        = new Array(count),
        lookupTable   = {},
        parentElement = (_parentElement) ? _parentElement : this.getElement();

    for (var i = 0; i < count; i++) {
      var flake = flakes[i] = new SnowFlake(
        parentElement,
        utils.randomFlakePosition(),
        utils.randomFlakeVelocity()
      );

      lookupTable[flake.id] = flake;
    }

    this._flakeLookupTable = lookupTable;

    return flakes;
  }

  getFlakeByID(id) {
    return this._flakeLookupTable[id];
  }

  clone() {
    return new SnowStorm(this.getParentElement(), this);
  }

  update(deltaMS) {
    var flakes = this._flakes;
    for (var i = 0, il = flakes.length; i < il; i++) {
      var flake = flakes[i];
      flake.update(deltaMS);
    }
  }
}

module.exports = SnowStorm;
