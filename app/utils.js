var uuidCounter = 1;

var VELOCITY_SCALAR     = 1,
    VELOCITY_X_SCALAR   = 0.1,
    VELOCITY_Y_SCALAR   = 3,
    VELOCITY_Z_SCALAR   = 0.1,
    VELOCITY_AXIS_MIN   = 0.0005,
    VELOCITY_AXIS_MAX   = 0.5,
    SNOW_FLAKE_SIZE     = 30,
    SNOW_FLAKE_START_X  = 1,
    SNOW_FLAKE_START_Y  = (SNOW_FLAKE_SIZE / window.innerHeight);

function genID(prefix) {
  return [ prefix || 'uuid', uuidCounter++ ].join('-');
}

function createElement(root, attributes) {
  var element = document.createElement('div');

  var attributeNames = Object.keys(attributes || {});
  for (var i = 0, il = attributeNames.length; i < il; i++) {
    var attributeName   = attributeNames[i],
        attributeValue  = attributes[attributeName];
    element.setAttribute(attributeName, attributeValue);
  }

  root.appendChild(element);

  return element;
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

function random(scalar) {
  return ((Math.random() * 2) - 1) * (scalar || 1);
}

function positive(value) {
  return (value < 0) ? (value * -1) : value;
}

function randomFlakePosition(resetY) {
  return [
    (Math.random() * (SNOW_FLAKE_START_X * 3)) - (SNOW_FLAKE_START_X * 1.5),
    (resetY) ? -SNOW_FLAKE_START_Y : Math.random(),
    random()
  ];
}

function velocityBounds(velocityAxis) {
  if (velocityAxis < 0 && velocityAxis > -VELOCITY_AXIS_MIN)
    return -VELOCITY_AXIS_MIN;
  else if (velocityAxis > 0 && velocityAxis < VELOCITY_AXIS_MIN)
    return VELOCITY_AXIS_MIN;

  if (velocityAxis < 0 && velocityAxis < -VELOCITY_AXIS_MAX)
    return -VELOCITY_AXIS_MAX;
  else if (velocityAxis > 0 && velocityAxis > VELOCITY_AXIS_MAX)
    return VELOCITY_AXIS_MAX;

  return velocityAxis;
}

function randomFlakeVelocity() {
  return [
    velocityBounds(random(VELOCITY_SCALAR) * VELOCITY_X_SCALAR),
    velocityBounds(positive(random(VELOCITY_SCALAR)) * VELOCITY_Y_SCALAR),
    velocityBounds(random(VELOCITY_SCALAR) * VELOCITY_Z_SCALAR) * 0.5
  ];
}

function randomFlakeRotation() {
  return [
    random(),
    random(),
    random()
  ];
}

function randomFlakeRotationVelocity() {
  return [
    random(VELOCITY_SCALAR * 4),
    random(VELOCITY_SCALAR * 4),
    random(VELOCITY_SCALAR * 4)
  ];
}

module.exports = {
  SNOW_FLAKE_SIZE,
  SNOW_FLAKE_START_X,
  SNOW_FLAKE_START_Y,
  genID,
  createElement,
  removeElement,
  random,
  positive,
  randomFlakePosition,
  randomFlakeVelocity,
  randomFlakeRotation,
  randomFlakeRotationVelocity
};
