const { InstructionsReader } = require('./instructionsReader/instructionsReader');
const { MarsMission } = require('./marsMission/marsMission');
const Config = require('./config/config');

async function run(fileName) {
    return InstructionsReader.getMissionInstructionsList(fileName)
        .then(MarsMission.executeMission);
}


run(Config.instructionsFile.fileName).then(console.log).catch(console.error)

module.exports = {
    run
}