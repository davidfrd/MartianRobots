const { MissionCommands } = require('./missionCommands');
const { MarsMission } = require('../marsMission/marsMission');
const { Robot } = require('../marsMission/robot/robot');


const posX = 5;
const posY = 3;
let marsMission;

beforeEach(() => {
    marsMission = MissionCommands.INIT_MARS_MISSION([posX, posY]);
});

describe("INIT_MARS_MISSION", () => {

    test("should create mars mission", () => {

        expect(marsMission).toMatchObject(new MarsMission(posX, posY));
    });
});


describe("CREATE_ROBOT", () => {

    test("should create a robot inside mars Mission", () => {
        MissionCommands.CREATE_ROBOT([posX, posY, "E"], marsMission);
        expect(marsMission.getLastRobot()).toMatchObject(new Robot(posX, posY, "E"));
    });
});

describe("MOVE_ROBOT", () => {

    test("should move last added robot to mars Mission", () => {
        const instructions = ["R", "F", "R", "F", "R", "F", "R", "F", "F"];
        marsMission.addRobot(1, 1, "E");
        MissionCommands.MOVE_ROBOT(instructions, marsMission);
        expect(marsMission.getLastRobot()).toMatchObject(new Robot(2, 1, "E"));
    });
});