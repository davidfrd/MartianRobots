const Mars = require('./mars/mars').Mars
const Robot = require('./robot/robot').Robot

class MarsMission {

    constructor(marsXCoord, marsYCoord) {
        this.mars = new Mars(marsXCoord, marsYCoord);
        this.scents = []; // Array of coordinates with the scents
        this.robots = []; // Array of robots in Mars
    }

    addRobot(posX, posY, orientation) {
        this.robots.push(new Robot(posX, posY, orientation));
    }

    applyInstructionLastRobot(instruction) {
        let lastRobot = this.getLastRobot();

        if (!lastRobot) {
            throw "Cannot execute this instruction if there is no robot in Mars.";
        }

        if (lastRobot.getLost()) {
            return;
        }

        lastRobot.execInstruction(instruction);
        if (this.isTheRobotInsideMars(lastRobot.getPredictedPosition())) {
            lastRobot.applyChanges();
        } else if (this.thisPositionHaveScent(lastRobot.getPredictedPosition())) {
            lastRobot.resetChanges();
        } else {
            lastRobot.resetChanges();
            lastRobot.setLost(true);
            this.createScent(lastRobot.getPosition());
        }
        console.log(lastRobot.getPosition(), lastRobot.getOrientation(), lastRobot.getLost(), instruction)
    }

    isTheRobotInsideMars(predictedRobotPosition) {
        const marsLeftBottomCorner = this.mars.getLeftBottomCorner();
        const marsRightUpperCorner = this.mars.getRightUpperCorner();
        return marsLeftBottomCorner.x <= predictedRobotPosition.x && marsLeftBottomCorner.y <= predictedRobotPosition.y &&
            marsRightUpperCorner.x >= predictedRobotPosition.x && marsRightUpperCorner.y >= predictedRobotPosition.y;
    }

    thisPositionHaveScent(position) {
        return this.scents.find(scentPos =>
            scentPos.x === position.x || this.scents.y === position.y
        );
    }

    createScent(position) {
        this.scents.push(position);
    }

    getLastRobot() {
        return this.robots[this.robots.length - 1];
    }

    getResult() {
        console.log(`Getting Results of ${this.robots.length}`);
        this.robots.forEach(robot => {
            const robotPosition = robot.getPosition();
            const robotLost = robot.getLost();
            const robotOrientation = robot.getOrientation();
            console.log(`${robotPosition.x} ${robotPosition.y} ${robotOrientation} ${robotLost? "LOST" : ""}`);
        });
    }

}

module.exports = {
    MarsMission
}