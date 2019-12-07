var vAdd        = require('vectors/add')(3),
    vSub        = require('vectors/sub')(3),
    vDiv        = require('vectors/div')(3),
    vMul        = require('vectors/mult')(3),
    vDist       = require('vectors/dist')(3),
    vCross      = require('vectors/cross')(3),
    vMag        = require('vectors/mag')(3),
    vDot        = require('vectors/dot')(3),
    vAngle      = require('vectors/heading')(2),
    vLerp       = require('vectors/lerp')(3),
    vLimit      = require('vectors/limit')(3),
    vNormalize  = require('vectors/normalize')(3),
    utils       = require('./utils');

class Vector {
  constructor(_axes) {
    Object.defineProperties(this, {
      _axes: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: this._coerceVectorData(_axes, false)
      },
      x: {
        enumerable: false,
        configurable: true,
        get: () => this._axes[0],
        set: (value) => this._axes[0] = value
      },
      y: {
        enumerable: false,
        configurable: true,
        get: () => this._axes[1],
        set: (value) => this._axes[1] = value
      },
      z: {
        enumerable: false,
        configurable: true,
        get: () => this._axes[2],
        set: (value) => this._axes[2] = value
      }
    });
  }

  _coerceVectorData(_axes, allowScalar) {
    if (allowScalar !== false && typeof _axes === 'number')
      return _axes;

    var axes = _axes;
    if (axes instanceof Vector)
      axes = axes.getAxes();
    else if (!(axes instanceof Array) || axes.length !== 3)
      throw new TypeError('Vector: Initializer must be another Vector object, or an array of three numbers');

    return axes;
  }

  getAxes() {
    return this._axes;
  }

  add(axes) {
    vAdd(this._axes, this._coerceVectorData(axes));
    return this;
  }

  sub(axes) {
    vSub(this._axes, this._coerceVectorData(axes));
    return this;
  }

  div(axes) {
    vDiv(this._axes, this._coerceVectorData(axes));
    return this;
  }

  mul(axes) {
    vMul(this._axes, this._coerceVectorData(axes));
    return this;
  }

  cross(axes) {
    return vCross(this._axes, this._coerceVectorData(axes, false));
  }

  dist(axes) {
    return vDist(this._axes, this._coerceVectorData(axes, false));
  }

  dist2(_axes) {
    var axes1 = this._axes,
        axes2 = this._coerceVectorData(_axes, false);

    return ((axes1[0] * axes2[0]) + (axes1[1] * axes2[1]) + (axes1[2] * axes2[2]));
  }

  mag() {
    return vMag(this._axes);
  }

  dot() {
    return vDot(this._axes, this._coerceVectorData(axes, false));
  }

  angle(axes) {
    return vAngle(this._axes, this._coerceVectorData(axes, false));
  }

  lerp(start, finish, scalar) {
    vLerp(
      this._axes,
      this._coerceVectorData(start, false),
      this._coerceVectorData(finish, false),
      scalar
    );

    return this;
  }

  limit(scalar) {
    vLimit(this._axes, scalar);
    return this;
  }

  normalize(scalar) {
    vNormalize(this._axes, scalar  || 1);
    return this;
  }

  set(axes) {
    this._axes = this._coerceVectorData(axes, false);
    return this;
  }

  clone() {
    return new Vector(this);
  }
}

Vector.random = function random(_scalar, helper) {
  var scalar = _scalar || 1;
  if (!(scalar instanceof Array))
    scalar = [ scalar, scalar, scalar ];

  var vector = new Vector([
    utils.random(scalar[0]),
    utils.random(scalar[1]),
    utils.random(scalar[2])
  ]);

  if (typeof helper === 'function')
    vector = helper(vector);

  return vector;
};

module.exports = Vector;
