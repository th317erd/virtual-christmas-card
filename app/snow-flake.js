var Vector  = require('./vector'),
    utils   = require('./utils');

class SnowFlake {
  constructor(parentElement, position, velocity) {
    Object.defineProperties(this, {
      id: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: utils.genID('snowflake')
      },
      _parentElement: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: parentElement
      },
      position: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: new Vector(position)
      },
      velocity: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: new Vector(velocity)
      },
      x: {
        enumerable: false,
        configurable: true,
        get: () => this.position.x,
        set: (value) => this.position.x = value
      },
      y: {
        enumerable: false,
        configurable: true,
        get: () => this.position.y,
        set: (value) => this.position.y = value
      },
      z: {
        enumerable: false,
        configurable: true,
        get: () => this.position.z,
        set: (value) => this.position.z = value
      },
      vx: {
        enumerable: false,
        configurable: true,
        get: () => this.velocity.x,
        set: (value) => this.velocity.x = value
      },
      vy: {
        enumerable: false,
        configurable: true,
        get: () => this.velocity.y,
        set: (value) => this.velocity.y = value
      },
      vz: {
        enumerable: false,
        configurable: true,
        get: () => this.velocity.z,
        set: (value) => this.velocity.z = value
      }
    });

    var element = utils.createElement(parentElement, {
      id: this.id,
      class: 'snowflake'
    });

    Object.defineProperties(this, {
      _element: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: element
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

  inBounds(x1, y1, x2, y2) {
    var x = this.x,
        y = this.y;

    if (x < x1)
      return false;

    if (x > x2)
      return false;

    if (y < y1)
      return false;

    if (y > y2)
      return false;

    return true;
  }

  resetFlake() {
    var newPosition = utils.randomFlakePosition(true),
        newVelocity = utils.randomFlakeVelocity();

    this.position.set(newPosition);
    this.velocity.set(newVelocity);
  }

  finalizeFlake() {
    if (!this.inBounds(0, -2, 1, 1))
      this.resetFlake();
  }

  update(deltaMS, _velocityScalar) {
    var element         = this.getElement(),
        velocityScalar  = (_velocityScalar) ? _velocityScalar : 1;

    velocityScalar *= deltaMS;

    this.position.add([ this.vx * velocityScalar, this.vy * velocityScalar, this.vz * velocityScalar ]);
    this.finalizeFlake();

    element.style.top   = (this.position.y * 100) + '%';
    element.style.left  = (this.position.x * 100) + '%';

    // element.style.transform = [
    //   'translate3d(',
    //   this.position.x * 100, '%,',
    //   this.position.y * 100, '%,',
    //   this.position.z * 0, 'px',
    //   ')'
    // ].join('');

    return this;
  }

  clone(parentElement) {
    return new SnowFlake(parentElement || this.getParentElement(), this.position, this.velocity);
  }
}

module.exports = SnowFlake;
