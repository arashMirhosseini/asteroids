const Util = {
  inherits(childClass, parentClass) {
    function Surrogate() {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass; 
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },

  dis(pos1, pos2) {
    const dX = Math.pow((pos1[0] - pos2[0]), 2);
    const dY = Math.pow((pos1[1] - pos2[1]), 2);
    return Math.sqrt(dX + dY);
  },

  len(vec) {
    return Util.dis([0, 0], vec);
  },

  dir(vec) {
    const len = Util.len(vec);
    return Util.scale(vec, 1 / len);
  }

};

module.exports = Util;