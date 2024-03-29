const Util = require("./util.js");
const MovingObject = require("./moving_object.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet");

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 3
};

function Asteroid(options) {

  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
    return true;
  } else if (otherObject instanceof Bullet){
    this.remove();
    otherObject.remove();
    return true;
  }
  return false;
};

module.exports = Asteroid;
