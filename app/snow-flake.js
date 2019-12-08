var Vector  = require('./vector'),
    utils   = require('./utils');

class SnowFlake {
  constructor(_opts) {
    var opts = Object.assign({
      position: utils.randomFlakePosition(),
      velocity: utils.randomFlakeVelocity(),
      rotation: utils.randomFlakeRotation(),
      rotationalVelocity: utils.randomFlakeRotationVelocity()
    }, _opts || {});

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
        value: opts.parentElement
      },
      position: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: new Vector(opts.position)
      },
      velocity: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: new Vector(opts.velocity)
      },
      rotation: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: new Vector(opts.rotation)
      },
      rotationalVelocity: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: new Vector(opts.rotationalVelocity)
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
      },
      rx: {
        enumerable: false,
        configurable: true,
        get: () => this.rotation.x,
        set: (value) => this.rotation.x = value
      },
      ry: {
        enumerable: false,
        configurable: true,
        get: () => this.rotation.y,
        set: (value) => this.rotation.y = value
      },
      rz: {
        enumerable: false,
        configurable: true,
        get: () => this.rotation.z,
        set: (value) => this.rotation.z = value
      },
      rvx: {
        enumerable: false,
        configurable: true,
        get: () => this.rotationalVelocity.x,
        set: (value) => this.rotationalVelocity.x = value
      },
      rvy: {
        enumerable: false,
        configurable: true,
        get: () => this.rotationalVelocity.y,
        set: (value) => this.rotationalVelocity.y = value
      },
      rvz: {
        enumerable: false,
        configurable: true,
        get: () => this.rotationalVelocity.z,
        set: (value) => this.rotationalVelocity.z = value
      }
    });

    var element = utils.createElement(opts.parentElement, {
      id: this.id,
      class: 'snowflake',
      type: Math.floor((Math.random() * 6)) + 1
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
    this.position.set(utils.randomFlakePosition(true));
    this.velocity.set(utils.randomFlakeVelocity());
    this.rotationalVelocity.set(utils.randomFlakeVelocity());
  }

  finalizeFlake() {
    if (!this.inBounds(
      -utils.SNOW_FLAKE_START_X - 0.001,
      -utils.SNOW_FLAKE_START_Y - 0.001,
      (utils.SNOW_FLAKE_START_X * 2) + 0.001,
      1
    )) this.resetFlake();
  }

  update(deltaMS, _velocityScalar, helper) {
    var element         = this.getElement(),
        velocityScalar  = (_velocityScalar) ? _velocityScalar : 1;

    velocityScalar *= deltaMS;

    this.position.add([
      this.vx * velocityScalar,
      this.vy * velocityScalar,
      this.vz * velocityScalar
    ]);

    this.rotation.add([
      this.rvx * velocityScalar,
      this.rvy * velocityScalar,
      this.rvz * velocityScalar
    ]);

    if (typeof helper === 'function')
      helper(this);

    this.finalizeFlake();

    // element.style.top   = (this.position.y * 100) + '%';
    // element.style.left  = (this.position.x * 100) + '%';

    element.style.transform = [
      'translate3d(',
      this.position.x * 100, 'vw,',
      this.position.y * 100, 'vh,',
      this.position.z * 0, 'px',
      ') ',
      'scale(',
      Math.abs(this.position.z) + ',',
      Math.abs(this.position.z),
      ') ',
      'rotateX(',
      this.rotation.x * 360, 'deg',
      ') ',
      'rotateY(',
      this.rotation.y * 360, 'deg',
      ') ',
      'rotateZ(',
      this.rotation.z * 360, 'deg',
      ') ',
    ].join('');

    // if (this.id === 'snowflake-2')
    //   console.log('Position.z', this.position.z);

    return this;
  }

  clone(parentElement) {
    return new SnowFlake(parentElement || this.getParentElement(), this.position, this.velocity);
  }
}

module.exports = SnowFlake;
