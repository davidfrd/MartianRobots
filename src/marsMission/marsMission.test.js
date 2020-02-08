const { MarsMission } = require('./marsMission');
const { Mars } = require('./mars/mars');
const { Robot } = require('./robot/robot');

describe("MarsMission creation", () => {
    test("should create mars", () => {
        let marsMission = new MarsMission(1, 2);
        expect(marsMission.robots).toEqual([]);
        expect(marsMission.scents).toEqual([]);
        expect(marsMission.mars).toMatchObject(new Mars(1, 2));
    })

});

describe("addRobot", () => {
    let marsMission = new MarsMission(1, 2);
    marsMission.addRobot(1, 1, "W");

    test("should pass coordinates fine", () => {
        const lastRobot = marsMission.getLastRobot();
        expect(lastRobot.getPosition()).toEqual({ x: 1, y: 1 });
    });

    test("should pass orientation fine", () => {
        const lastRobot = marsMission.getLastRobot();
        expect(lastRobot.getOrientationString()).toEqual("W");
    });

});

describe("applyInstructionLastRobot", () => {
    let marsMission;

    beforeEach(() => {
        marsMission = new MarsMission(1, 2);
    });

    test("moving robot inside mars", () => {
        marsMission.addRobot(1, 1, "S");
        marsMission.applyInstructionLastRobot("F");
        const lastRobot = marsMission.getLastRobot();
        expect(lastRobot.getPosition()).toEqual({ x: 1, y: 0 });
        expect(lastRobot.getOrientationString()).toEqual("S");
        expect(lastRobot.getLost()).toBeFalsy();

    });

    test("without put robot inside mars", () => {
        expect(() => marsMission.applyInstructionLastRobot("F")).toThrowError();
    });

    describe("getting lost", () => {
        beforeEach(() => {
            marsMission.addRobot(1, 2, "N");
            marsMission.applyInstructionLastRobot("F");
        });

        test("lost is true", () => {
            expect(marsMission.getLastRobot().getLost()).toBeTruthy();
        });

        test("leave scent", () => {
            expect(marsMission.thisPositionHaveScent({ x: 1, y: 2 })).toBeTruthy();
        })

        test("robot should stay in the same coord and orientation", () => {
            expect(marsMission.getLastRobot().getPosition()).toEqual({x: 1, y: 2});
            expect(marsMission.getLastRobot().getOrientationString()).toEqual("N");
        })
    })
});


describe("isTheRobotInsideMars", () => {

    let marsMission;

    beforeEach(() => {
        marsMission = new MarsMission(1, 2);
    });

    test("robot inside mars", () => {
        expect(marsMission.isTheRobotInsideMars({x: 0, y: 0})).toBeTruthy();
        expect(marsMission.isTheRobotInsideMars({x: 0, y: 1})).toBeTruthy();
        expect(marsMission.isTheRobotInsideMars({x: 0, y: 2})).toBeTruthy();
        expect(marsMission.isTheRobotInsideMars({x: 1, y: 0})).toBeTruthy();
        expect(marsMission.isTheRobotInsideMars({x: 1, y: 1})).toBeTruthy();
        expect(marsMission.isTheRobotInsideMars({x: 1, y: 2})).toBeTruthy();
    });

    test("robot outside mars", () => {
        expect(marsMission.isTheRobotInsideMars({x: -1, y: 1})).toBeFalsy();
        expect(marsMission.isTheRobotInsideMars({x: 10, y: 2})).toBeFalsy();
        expect(marsMission.isTheRobotInsideMars({x: 1, y: 4})).toBeFalsy();
        expect(marsMission.isTheRobotInsideMars({x: 1, y: -6})).toBeFalsy();
        expect(marsMission.isTheRobotInsideMars({x: -5, y: -9})).toBeFalsy();
    });
});

describe("thisPositionHaveScent", () => {

    let marsMission;
    beforeEach( () => {
        marsMission = new MarsMission(2, 3);
    });

    test("when have scent in one border", () => {
        const pos = {x: 1, y: 3}
        marsMission.createScent(pos);
        expect(marsMission.thisPositionHaveScent(pos)).toBeTruthy();
    });

    test("when have scent in two borders", () => {
        marsMission.createScent({x: 2, y: 3});
        expect(marsMission.thisPositionHaveScent({x: 0, y: 3})).toBeTruthy();
        expect(marsMission.thisPositionHaveScent({x: 2, y: 0})).toBeTruthy();
    });

    test("when the border have no scent", () => {
        marsMission.createScent({x: 1, y: 1});
        expect(marsMission.thisPositionHaveScent({x: 0, y: 0})).toBeFalsy();
    });
});


describe("createScent", () => {

    test("should add if is in the border", () => {
        let marsMission;
        marsMission = new MarsMission(1, 2);

        const pos1 = {x: 0, y: 2};
        marsMission.createScent(pos1);
        expect(marsMission.scents).toContain(pos1);

        const pos2 = {x: 1, y: 0};
        marsMission.createScent(pos2);
        expect(marsMission.scents).toContain(pos2);
    });

    test("shouldn't add if is not in the border", () => {
        let marsMission;
        marsMission = new MarsMission(2, 2);

        const pos1 = {x: 1, y: 1};
        marsMission.createScent(pos1);
        expect(marsMission.scents).not.toContain(pos1);

        const pos2 = {x: -1, y: -1};
        marsMission.createScent(pos2);
        expect(marsMission.scents).not.toContain(pos2);
    });

});

describe("getLastRobot", () => {

    test("return last robot", () => {
        let marsMission = new MarsMission(1, 2);
        marsMission.addRobot(1, 1, "W");
        const lastRobot = marsMission.getLastRobot();
        expect(lastRobot).toMatchObject(new Robot(1, 1, "W"));
    });
});

describe("getRobotsStatusString", () => {

    test("return one robot status as string", () => {
        let marsMission = new MarsMission(1, 2);
        marsMission.addRobot(1, 1, "W");
        expect(marsMission.getRobotsStatusString()).toEqual('1 1 W\n');
    });

    test("return multiple robot status as string", () => {
        let marsMission = new MarsMission(1, 2);
        marsMission.addRobot(1, 1, "W");
        marsMission.addRobot(2, 0, "S");
        expect(marsMission.getRobotsStatusString()).toEqual('1 1 W\n2 0 S\n');
    });

    test("return multiple robot status as string with LOST", () => {
        let marsMission = new MarsMission(1, 2);
        marsMission.addRobot(1, 1, "W");
        marsMission.addRobot(2, 0, "S");
        marsMission.applyInstructionLastRobot("F");
        expect(marsMission.getRobotsStatusString()).toEqual('1 1 W\n2 0 S LOST\n');
    });
})