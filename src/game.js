const Asteroid = require("./asteroid.js");
const Util = require("./util.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 10;
  this.addAsteroids = this.addAsteroids.bind(this);
  this.asteroids = [];
  this.bullets = [];
  this.ships = [];
  this.addAsteroids();
}

Game.BG_COLOR = "#000000";

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    const pos = this.randomPosition();
    const asteroid = new Asteroid({ pos: pos, game: this });
    this.add(asteroid);
  }
}

Game.prototype.add = function(obj) {
  if (obj instanceof Asteroid) {
    this.asteroids.push(obj);
  } else if (obj instanceof Bullet) {
    this.bullets.push(obj)
  } else {
    this.ships.push(obj);
  }
}

Game.prototype.addShip = function() {
  const ship = new Ship({ pos: this.randomPosition(), game: this });
  this.add(ship);
  return ship;
}

Game.prototype.randomPosition = function() {
  const xPos = Math.random() * this.DIM_X;
  const yPos = Math.random() * this.DIM_Y;
  return [xPos, yPos];
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

  const allObj = this.allObjects();
  allObj.forEach((obj) => {
    obj.draw(ctx);
  });
}

Game.prototype.moveObjects = function(delta) {
  this.allObjects().forEach((obj) => {
    
    obj.move(delta);
  });
}

Game.prototype.wrap = function(pos) {
  return [Util.wrap(pos[0], this.DIM_X), Util.wrap(pos[1], this.DIM_Y)];
}

Game.prototype.checkCollisions = function() {
  const allObjs = this.allObjects();
  for (let i = 0; i < allObjs.length; i++) {
    for (let j = 0; j < allObjs.length; j++) {
      const object1 = allObjs[i];
      const object2 = allObjs[j];
      if (object1.isCollideWith(object2)) {
        const collision = object1.collideWith(object2);
        if (collision) return;
      }
    }
  }
  return null;
}

Game.prototype.step = function(timeDelta) {
  this.moveObjects(timeDelta);
  this.checkCollisions();
}

Game.prototype.remove = function(object) {
  
  if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if (object instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  } else if (object instanceof Ship) {
    this.ships.splice(this.ships.indexOf(object), 1);
  } else {
    console.log(object);
    throw new Error("unknown type of object");
  }
}

Game.prototype.allObjects = function() {
  return [].concat(this.ships, this.asteroids, this.bullets);
}

Game.prototype.isOutOfBounds = function(pos) {
  return (
    pos[0] < 0 ||
    pos[0] > this.DIM_X ||
    pos[1] < 0 ||
    pos[1] > this.DIM_Y
  );
}

module.exports = Game;