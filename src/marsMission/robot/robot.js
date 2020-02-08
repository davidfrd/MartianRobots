const { Coordinate } = require('../coordinate/coordinate');
const { RobotInstructions } = require('../../robotInstructions/robotInstructions');
const { Orientation } = require('../orientation/orientation');
const Utils = require('../../utils/utils');


class Robot {

    constructor(posX, posY, orientation) {
        this.predictedPosition = new Coordinate(posX, posY);
        this.predictedOrientation = Orientation[orientation];
        this.lost = false;
        this.applyChanges();
    }

    getPosition() {
        return this.position;
    }

    getPredictedPosition() {
        return this.predictedPosition;
    }

    setLost(lost) {
        this.lost = lost;
    }

    getLost() {
        return this.lost;
    }

    getOrientation() {
        return this.orientation;
    }

    getOrientationString() {
        return Object.keys(Orientation).find(k => Orientation[k] === this.orientation);
    }

    execInstruction(robotInstruction) {
        RobotInstructions[robotInstruction](this);
    }

    move(length) {
        let rotationInRad = this.orientation * Math.PI / 2;
        // Math.round() is used because in JS Math.sin(Math.PI) !== 0
        this.predictedPosition.x = this.position.x + length * Math.cos(rotationInRad).toFixed(2);
        this.predictedPosition.y = this.position.y + length * Math.sin(rotationInRad).toFixed(2);
    }

    rotate(rotation) {
        // fix rotation betwen [0-3]
        this.predictedOrientation = (this.orientation + rotation) % Object.keys(Orientation).length;
        this.predictedOrientation = this.orientation < 0 ? this.predictedOrientation + Object.keys(Orientation).length : this.predictedOrientation;
    }

    applyChanges() {
        this.position = Utils.copyObject(this.predictedPosition);
        this.orientation = this.predictedOrientation;
    }

    resetChanges() {
        this.predictedPosition = Utils.copyObject(this.position);
        this.predictedOrientation = this.orientation;
    }

}

module.exports = {
    Robot
}