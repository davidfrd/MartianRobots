const { InstructionsReader } = require('./instructionsReader');
const { MissionCommands } = require('../missionCommands/missionCommands');
const Config = require('../config/config')

describe("Instruction Reader test", () => {
    const expectedLines = [
        "5 3",
        "1 1 E",
        "RFRFRFRF",
        "3 2 N",
        "FRRFLLFFRRFLL",
        "0 3 W",
        "LLFFFLFLFL",
    ];

    const expectedMissionInstructions = [
        { command: MissionCommands.INIT_MARS_MISSION, data: [5, 3] },
        { command: MissionCommands.CREATE_ROBOT, data: [1, 1, "E"] },
        { command: MissionCommands.MOVE_ROBOT, data: ["R", "F", "R", "F", "R", "F", "R", "F"] },
        { command: MissionCommands.CREATE_ROBOT, data: [3, 2, "N"] },
        { command: MissionCommands.MOVE_ROBOT, data: ["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"] },
        { command: MissionCommands.CREATE_ROBOT, data: [0, 3, "W"] },
        { command: MissionCommands.MOVE_ROBOT, data: ["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"] },
    ]

    test("Should return missionInstructions", async () => {
        const missionInstructions = await InstructionsReader.getMissionInstructionsList(Config.instructionsFile.fileName);
        expect(missionInstructions).toEqual(expectedMissionInstructions);
    });

    test("Should return lines splited ", async () => {
        const lines = await InstructionsReader.getLinesFromFile(Config.instructionsFile.fileName);
        expect(lines).toEqual(expectedLines);
    });

    test("Should return missionInstructions from file lines", async () => {
        const missionInstructions = await InstructionsReader.createMissionInstructionsList(expectedLines);
        expect(missionInstructions).toEqual(expectedMissionInstructions);
    })

});


describe("checkMarsLengthData", () => {

    describe("given an valid data", () => {
        test("returns no error", () => {
            expect(() => InstructionsReader.checkMarsLengthData([5, 2])).not.toThrowError();

        })
    });

    describe("given an invalid data", () => {
        test("with not valid length", () => {
            expect(() => InstructionsReader.checkMarsLengthData([5, 4, 2])).toThrowError();

        });
        test("with a string", () => {
            expect(() => InstructionsReader.checkMarsLengthData([5, "A"])).toThrowError();
        });
    })

});


describe("checkRobotCreationData", () => {

    describe("given an valid data", () => {
        test("returns no error", () => {
            expect(() => InstructionsReader.checkRobotCreationData([1, 3, "E"])).not.toThrowError();

        })
    });

    describe("given an invalid data", () => {
        test("with not valid length", () => {
            expect(() => InstructionsReader.checkRobotCreationData([5, 4, 5, "E"])).toThrowError();

        });
        test("with a string as coordinate", () => {
            expect(() => InstructionsReader.checkRobotCreationData([5, "A", "E"])).toThrowError();
        });
        test("with a invalid orientation", () => {
            expect(() => InstructionsReader.checkRobotCreationData([5, 4, "U"])).toThrowError();
        });
    })

});

describe("checkCoordinate", () => {

    describe("given an valid data", () => {
        test("returns no error", () => {
            expect(InstructionsReader.checkCoordinate(1)).toBeTruthy();
        })
    });

    describe("given an invalid data", () => {
        test("with value higher than 50", () => {
            expect(InstructionsReader.checkCoordinate(56)).toBeFalsy();

        });

        test("with negative value", () => {
            expect(InstructionsReader.checkCoordinate(-1)).toBeFalsy();

        });
        test("with a string as coordinate", () => {
            expect(InstructionsReader.checkCoordinate("5")).toBeFalsy();
        });
    })

});


describe("checkRobotOrientation", () => {

    describe("given an valid data", () => {
        test("returns no error", () => {
            expect(InstructionsReader.checkRobotOrientation("N")).toBeTruthy();
        })
    });

    describe("given an invalid data", () => {
        test("number", () => {
            expect(InstructionsReader.checkRobotOrientation(2)).toBeFalsy();

        });

        test("not existing orientation", () => {
            expect(InstructionsReader.checkRobotOrientation("I")).toBeFalsy();

        });
    })

});

describe("checkRobotInstructionsData", () => {

    describe("given an valid data", () => {
        test("returns no error", () => {
            expect(() => InstructionsReader.checkRobotInstructionsData(["F", "R", "R", "F", "L", "L", "F", "F", "R", "R", "F", "L", "L"])).not.toThrowError();
        })
    });

    describe("given an invalid data", () => {
        test("too long", () => {
            expect(() => InstructionsReader.checkRobotInstructionsData("F".repeat(101).split(''))).toThrowError();

        });

        test("not existing instruction", () => {
            expect(() => InstructionsReader.checkRobotInstructionsData(["K"])).toThrowError();

        });
    })

});