const InstructionsReader = require('./instructionsReader/instructionsReader').InstructionsReader
const MarsMission = require('./marsMission/marsMission').MarsMission


const INDEXES = {
    ROBOT_CREATION: 0,
    INSTRUCTION: 1
}

InstructionsReader.getInstructionsList().then(lines => {
    console.log(lines);
    const [marsXLength, marsYLength] = lines.shift().split(' ');
    let marsMission = new MarsMission(marsXLength, marsYLength);
    lines.forEach((line, index) => {
        switch (index % Object.keys(INDEXES).length) {
            case INDEXES.ROBOT_CREATION:
                let [x, y, orientation] = line.split(' ');
                marsMission.addRobot(Number(x), Number(y), orientation);
                break;
            case INDEXES.INSTRUCTION:
                line.split('').forEach(inst => marsMission.applyInstructionLastRobot(inst));
                console.log('\n');
                break;
        }
    });
    marsMission.getResult();
}).catch(console.log);