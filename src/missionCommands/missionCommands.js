const { MarsMission } = require('../marsMission/marsMission');

const MissionCommands = {
    INIT_MARS_MISSION: ([x, y]) => new MarsMission(x, y),
    CREATE_ROBOT: ([x, y, orientation], marsMission) => marsMission.addRobot(x, y, orientation),
    MOVE_ROBOT: (instructionArray, marsMission) => instructionArray.forEach(instruction => marsMission.applyInstructionLastRobot(instruction))
}

module.exports = {
    MissionCommands
};