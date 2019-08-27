/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#505050\",\n  RADIUS: 25,\n  SPEED: 4\n};\n\nfunction Asteroid(options) {\n  this.COLOR = DEFAULTS.COLOR;\n  this.RADIUS = DEFAULTS.RADIUS;\n  options.color = this.COLOR;\n  options.radius = this.RADIUS;\n  const vel = Util.randomVec(DEFAULTS.SPEED);\n  options.vel = vel;\n  MovingObject.call(this, options);\n\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction Game() {\n  this.DIM_X = 1000;\n  this.DIM_Y = 600;\n  this.NUM_ASTEROIDS = 10;\n  this.addAsteroids = this.addAsteroids.bind(this);\n  this.asteroids = [];\n  this.addAsteroids();\n}\n\nGame.prototype.addAsteroids = function() {\n  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {\n    const pos = this.randomPosition();\n    const asteroid = new Asteroid({ pos: pos, game: this });\n    this.asteroids.push(asteroid);\n  }\n\n}\n\nGame.prototype.randomPosition = function() {\n  const xPos = Math.random() * this.DIM_X;\n  const yPos = Math.random() * this.DIM_Y;\n  return [xPos, yPos];\n}\n\nGame.prototype.draw = function(ctx) {\n  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n  this.asteroids.forEach((asteroid) => {\n    asteroid.draw(ctx);\n  });\n}\n\nGame.prototype.moveObjects = function() {\n  this.asteroids.forEach((asteroid) => {\n    asteroid.move();\n  });\n}\n\nGame.prototype.wrap = function(pos) {\n  return [Util.wrap(pos[0], this.DIM_X), Util.wrap(pos[1], this.DIM_Y)];\n}\n\nGame.prototype.checkCollisions = function() {\n  for (let i = 0; i < this.asteroids.length; i++) {\n    const asteroid1 = this.asteroids[i];\n    for (let j = i + 1; j < this.asteroids.length; j++) {\n      const asteroid2 = this.asteroids[j];\n      if (asteroid1.isCollideWith(asteroid2)) {\n        console.log(`number of asteroids: ${this.NUM_ASTEROIDS}`);\n        asteroid1.collideWith(asteroid2);\n      }\n    }\n  }\n  return null;\n}\n\nGame.prototype.step = function() {\n  this.moveObjects();\n  this.checkCollisions();\n}\n\nGame.prototype.remove = function(asteroid) {\n  this.NUM_ASTEROIDS--;\n  const indexAsteroid = this.asteroids.indexOf(asteroid);\n  this.asteroids.splice(indexAsteroid, 1);\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nfunction GameView(ctx) {\n  this.game = new Game();\n  this.ctx = ctx;\n}\n\nGameView.prototype.start = function() {\n  setInterval(() => {\n    this.game.step();\n    this.game.draw(this.ctx);\n  }, 20);\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', function() {\n  const canvas = document.getElementById('game-canvas');\n  const ctx = canvas.getContext('2d');\n  canvas.width = 1000;\n  canvas.height = 600;\n  const gameView = new GameView(ctx);\n  gameView.start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nfunction MovingObject(obj) {\n  this.pos = obj.pos;\n  this.vel = obj.vel;\n  this.radius = obj.radius;\n  this.color = obj.color;\n  this.game = obj.game;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n  ctx.fill();\n  ctx.fillStyle = this.color;\n}\n\nMovingObject.prototype.move = function() {\n  const wrapPos = this.game.wrap(this.pos);\n  this.pos[0] = wrapPos[0] + this.vel[0];\n  this.pos[1] = wrapPos[1] + this.vel[1];\n\n}\n\nMovingObject.prototype.isCollideWith = function(otherObject) {\n  const dist = Util.dis(this.pos, otherObject.pos);\n  if (dist < this.radius + otherObject.radius) {\n    return true;\n  } \n  return false; \n}\n\nMovingObject.prototype.collideWith = function(otherObject) {\n  this.game.remove(otherObject);\n  this.game.remove(this);\n}\n\nmodule.exports = MovingObject;\n\n\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  inherits(childClass, parentClass) {\n    function Surrogate() {};\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate();\n    childClass.prototype.constructor = childClass; \n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  \n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  },\n\n  dis(pos1, pos2) {\n    const dX = Math.pow((pos1[0] - pos2[0]), 2);\n    const dY = Math.pow((pos1[1] - pos2[1]), 2);\n    return Math.sqrt(dX + dY);\n  }\n\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });