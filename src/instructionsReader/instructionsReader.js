const fs = require('fs')
const { MissionCommands } = require('../missionCommands/missionCommands');
const { RobotInstructions } = require('../robotInstructions/robotInstructions');
const { Orientation } = require('../marsMission/orientation/orientation');
const Utils = require('../utils/utils');
const Config = require('../config/config');

const LINES_INDEXES = {
    ROBOT_INITIAL_STATUS: 0,
    INSTRUCTION: 1
}

class InstructionsReader {

    static async getMissionInstructionsList(fileName, encoding, returnCarriageCharacter) {
        return InstructionsReader.getLinesFromFile(fileName, encoding, returnCarriageCharacter)
            .then(InstructionsReader.createMissionInstructionsList);
    }

    static async getLinesFromFile(fileName, encoding, returnCarriageCharacter) {
        let content = fs.readFileSync(fileName, encoding);
        return content.split(returnCarriageCharacter);
    }

    static async createMissionInstructionsList(fileLines) {
        let missionInstructions = [];
        const marsLengthData = fileLines.shift().split(Config.marsUpperLeftCornerSeparator).map(Utils.convertStringsIntoNumber);
        InstructionsReader.checkMarsLengthData(marsLengthData);
        missionInstructions.push({ command: MissionCommands.MARS_LENGTH, data: marsLengthData });
        fileLines.forEach((line, index) => {
            switch (index % Object.keys(LINES_INDEXES).length) {
                case LINES_INDEXES.ROBOT_INITIAL_STATUS:
                    const robotCreationData = line.split(Config.robotInitialStatusSeparator).map(Utils.convertStringsIntoNumber);
                    InstructionsReader.checkRobotCreationData(robotCreationData);
                    missionInstructions.push({ command: MissionCommands.ROBOT_CREATION, data: robotCreationData });
                    break;
                case LINES_INDEXES.INSTRUCTION:
                    const robotInstructionsData = line.split(Config.robotInstructionsSeparator).map(Utils.convertStringsIntoNumber);
                    InstructionsReader.checkRobotInstructionsData(robotInstructionsData);
                    missionInstructions.push({ command: MissionCommands.ROBOT_INSTRUCTIONS, data: robotInstructionsData });
                    break;
            }
        });
        return missionInstructions;
    }

    static checkMarsLengthData(data) {
        if (data.length === 2 && InstructionsReader.checkCoordinate(data[0]) && InstructionsReader.checkCoordinate(data[1])) {
            return;
        }
        throw `Mars Length Data ${data} is not valid`;
    }

    static checkRobotCreationData(robotCreationData) {
        if (robotCreationData.length === 3 &&
            InstructionsReader.checkCoordinate(robotCreationData[0]) &&
            InstructionsReader.checkCoordinate(robotCreationData[1]) &&
            InstructionsReader.checkRobotOrientation(robotCreationData[2])) {
            return;
        }
        throw `Robot Initial Data ${robotCreationData} is not valid`;
    }

    static checkCoordinate(coord) {
        return 0 <= coord <= 50 && typeof coord === 'number';
    }

    static checkRobotOrientation(orientation) {
        return Object.keys(Orientation).includes(orientation);
    }

    static checkRobotInstructionsData(instructions) {
        if (1 > instructions.length > 100) {
            throw `Robot Instruction ${instructions} length should be between 1 and 100`;
        }

        if (!instructions.every(instruction => Object.keys(RobotInstructions).includes(instruction))) {
            throw `Robot Instruction only admits ${Object.keys(RobotInstructions)}`
        }

    }
}

module.exports = {
    InstructionsReader
}