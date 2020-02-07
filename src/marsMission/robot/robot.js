const { Coordinate } = require('../coordinate/coordinate');
const { RobotInstructions } = require('../../robotInstructions/robotInstructions');
const { Orientation } = require('../orientation/orientation');

class Robot {

    constructor(posX, posY, orientation) {
        this.predictedPosition = new Coordinate(posX, posY);
        this.predictedRotation = Orientation[orientation];
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

    getRotation() {
        return this.rotation;
    }

    getOrientation() {
        return Object.keys(Orientation).find(k => Orientation[k] === this.rotation);
    }

    execInstruction(instruction) {
        RobotInstructions[instruction](this);
    }

    move(length) {
        let rotationInRad = this.rotation * Math.PI / 2;
        // Math.round() is used because in JS Math.sin(Math.PI) !== 0
        this.predictedPosition.x = this.position.x + length * Math.cos(rotationInRad).toFixed(2);
        this.predictedPosition.y = this.position.y + length * Math.sin(rotationInRad).toFixed(2);
    }

    rotate(rotation) {
        // fix rotation betwen [0-3]
        this.predictedRotation = (this.predictedRotation + rotation) % Object.keys(Orientation).length;
        this.predictedRotation = this.predictedRotation < 0 ? this.predictedRotation + Object.keys(Orientation).length : this.predictedRotation;
    }

    applyChanges() {
        this.position = Object.assign({}, this.predictedPosition);
        this.rotation = this.predictedRotation;
    }

    resetChanges() {
        this.predictedPosition = Object.assign({}, this.position);
        this.predictedRotation = this.rotation;
    }

}

module.exports = {
    Robot
}