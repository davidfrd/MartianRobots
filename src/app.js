const { InstructionsReader } = require('./instructionsReader/instructionsReader');
const { MarsMission } = require('./marsMission/marsMission');
const Config = require('./config/config');


async function run() {
    return InstructionsReader.getMissionInstructionsList(Config.instructionsFile.filename,
        Config.instructionsFile.encoding, 
        Config.instructionsFile.returnCarriageCharacter)
        .then(MarsMission.executeMission);
}


run().then(console.log).catch(console.log)