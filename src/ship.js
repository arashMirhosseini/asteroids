const MovingObject = require("./moving_object");
const Util = require("./util");
const Bullet = require("./bullet");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Ship(options) {
  options.radius = Ship.RADIUS;
  options.vel = options.vel || [0, 0];
  options.color = options.color || randomColor();

  MovingObject.call(this, options);
}

Ship.RADIUS = 10;

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
}

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

Ship.prototype.fireBullet = function() {
  const len = Util.norm(this.vel);

  if (len === 0) {
    // Can't fire unless moving.
    return;
  }

  const relVel = Util.scale(
    Util.dir(this.vel),
    Bullet.SPEED
  );

  const bulletVel = [
    relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  ];

  const bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: this.color,
    game: this.game
  });

  this.game.add(bullet);


}

module.exports = Ship;
