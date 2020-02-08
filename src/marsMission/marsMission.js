const { Mars } = require('./mars/mars');
const { Robot } = require('./robot/robot');

class MarsMission {

    constructor(marsXCoord, marsYCoord) {
        this.mars = new Mars(marsXCoord, marsYCoord);
        this.scents = []; // Array of coordinates with the scents
        this.robots = []; // Array of robots in Mars
    }

    static async executeMission(missionInstructions) {
        let marsLengthInstruction = missionInstructions.shift();
        let marsMission = marsLengthInstruction.command(marsLengthInstruction.data);
        missionInstructions.forEach(instruction => instruction.command(instruction.data, marsMission));
        return marsMission.getRobotsStatusString();
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
    }

    isTheRobotInsideMars(predictedRobotPosition) {
        const marsLeftBottomCorner = this.mars.getLeftBottomCorner();
        const marsRightUpperCorner = this.mars.getRightUpperCorner();
        return marsLeftBottomCorner.x <= predictedRobotPosition.x && marsLeftBottomCorner.y <= predictedRobotPosition.y &&
            marsRightUpperCorner.x >= predictedRobotPosition.x && marsRightUpperCorner.y >= predictedRobotPosition.y;
    }

    thisPositionHaveScent(position) {
        return this.scents.find(scentPos =>
            scentPos.x === position.x || scentPos.y === position.y
        );
    }

    createScent(position) {
        const marsLeftBottomCorner = this.mars.getLeftBottomCorner();
        const marsRightUpperCorner = this.mars.getRightUpperCorner();
        if (marsLeftBottomCorner.x === position.x || marsLeftBottomCorner.y === position.y ||
            marsRightUpperCorner.x === position.x || marsRightUpperCorner.y === position.y) {
            this.scents.push(position);
        }
    }

    getLastRobot() {
        return this.robots[this.robots.length - 1];
    }

    getRobotsStatusString() {
        let robotsStatusesString = "";
        this.robots.forEach(robot => {
            const robotPosition = robot.getPosition();
            const robotLost = robot.getLost();
            const robotOrientation = robot.getOrientation();
            robotsStatusesString += `${robotPosition.x} ${robotPosition.y} ${robotOrientation}${robotLost ? " LOST" : ""}\n`;
        });
        return robotsStatusesString;
    }

}

module.exports = {
    MarsMission
}