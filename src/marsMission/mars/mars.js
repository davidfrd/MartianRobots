const Coordinate = require('../coordinate/coordinate').Coordinate

class Mars {

    constructor(xLength, yLength) {
        this.leftBottomCorner = new Coordinate(0, 0);
        this.rightUpperCorner = new Coordinate(xLength, yLength);
    }

    getLeftBottomCorner() {
        return this.leftBottomCorner;
    }

    getRightUpperCorner() {
        return this.rightUpperCorner;
    }

}

module.exports = {
    Mars
}