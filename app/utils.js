var uuidCounter = 1;

var VELOCITY_SCALAR   = 0.0001,
    VELOCITY_X_SCALAR = 0.5,
    VELOCITY_Z_SCALAR = 0.25,
    VELOCITY_AXIS_MIN = 0.00005,
    VELOCITY_AXIS_MAX = 0.01;


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
    Math.random(),
    (resetY) ? 0 : Math.random(),
    random() * 0.5
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
    velocityBounds(positive(random(VELOCITY_SCALAR))),
    velocityBounds(random(VELOCITY_SCALAR) * VELOCITY_Z_SCALAR)
  ];
}

module.exports = {
  genID,
  createElement,
  removeElement,
  random,
  positive,
  randomFlakePosition,
  randomFlakeVelocity
};
