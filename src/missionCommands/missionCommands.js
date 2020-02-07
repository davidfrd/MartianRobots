const { MarsMission } = require('../marsMission/marsMission');

const MissionCommands = {
    MARS_LENGTH: ([x, y]) => new MarsMission(x, y),
    ROBOT_CREATION: ([x, y, orientation], marsMission) => marsMission.addRobot(x, y, orientation),
    ROBOT_INSTRUCTIONS: (instructionArray, marsMission) => instructionArray.forEach(instruction => marsMission.applyInstructionLastRobot(instruction))
}

module.exports = {
    MissionCommands
};