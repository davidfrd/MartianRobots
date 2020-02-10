const { InstructionsReader } = require('./instructionsReader/instructionsReader');
const { MarsMission } = require('./marsMission/marsMission');

async function run(fileName) {
    let missionInstructionsList = InstructionsReader.getMissionInstructionsList(fileName);
    return MarsMission.executeMission(missionInstructionsList);
}

module.exports = {
    run
}