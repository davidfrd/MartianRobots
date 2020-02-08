const { Robot } = require('./robot');
const { Coordinate } = require('../coordinate/coordinate');
const { Orientation } = require('../orientation/orientation')
const { RobotInstructions } = require('../../robotInstructions/robotInstructions');


const posX = 4;
const posY = 7;
let robot;
beforeEach(() => {
    robot = new Robot(posX, posY, "W");
});

describe("constructor", () => {

    test("should create robot with the right values", () => {

        expect(robot.position).toMatchObject(new Coordinate(posX, posY));
        expect(robot.predictedPosition).toMatchObject(new Coordinate(posX, posY));
        expect(robot.orientation).toEqual(Orientation.W);
        expect(robot.predictedOrientation).toEqual(Orientation.W);
    });
});

describe("getPosition", () => {

    test("should return position", () => {
        expect(robot.getPosition()).toBe(robot.position);
    });

});

describe("getPredictedPosition", () => {

    test("should return predicted position", () => {
        expect(robot.getPredictedPosition()).toBe(robot.predictedPosition);
    });

});

describe("setLost", () => {

    test("should set lost to true", () => {
        robot.setLost(true);
        expect(robot.lost).toBeTruthy();
    });

    test("should set lost to false", () => {
        robot.setLost(false);
        expect(robot.lost).toBeFalsy();
    });

});

describe("getLost", () => {

    test("should get true", () => {
        robot.lost = true;
        expect(robot.getLost()).toBeTruthy();
    });

    test("should get false", () => {
        robot.lost = false;
        expect(robot.getLost()).toBeFalsy();
    });
});

describe("getOrientation", () => {

    test("should return orientation", () => {
        expect(robot.getOrientation()).toBe(Orientation.W);
    });

});

describe("getOrientationString", () => {

    test("should return orientation in string format", () => {
        expect(robot.getOrientationString()).toBe("W");
    });
});

describe("execInstruction", () => {

    test("should apply instruction to the robot", () => {
        const instruction = "F";
        robot.execInstruction(instruction);

        const expectedRobot = new Robot(posX, posY, "W");
        RobotInstructions.F(expectedRobot);

        expect(robot).toMatchObject(expectedRobot);
    });
});

describe("move", () => {
    const movementLength = 1;

    test("should move the robot temporary (predictedPosition) on W (-x axis)", () => {
        robot.orientation = Orientation.W;
        robot.move(movementLength);
        expect(robot.getPredictedPosition()).toMatchObject(new Coordinate(posX - movementLength, posY));
    });

    test("should move the robot temporary (predictedPosition) on N (+y axis)", () => {
        robot.orientation = Orientation.N;
        robot.move(movementLength);
        expect(robot.getPredictedPosition()).toMatchObject(new Coordinate(posX, posY + movementLength));
    });

});

describe("rotate", () => {

    test("should rotate the robot temporary state (predictedRotation) to the left", () => {
        robot.rotate(1);
        expect(robot.predictedOrientation).toEqual(Orientation.S);
    });

    test("should rotate the robot temporary state (predictedRotation) to the right", () => {
        robot.rotate(-1);
        expect(robot.predictedOrientation).toEqual(Orientation.N);
    });
});

describe("applyChanges", () => {

    test("should copy predicted position current position", () => {
        robot.move(1);
        robot.applyChanges();
        expect(robot.position).toEqual(robot.predictedPosition);
    });

    test("should copy predicted orientation current orientation", () => {
        robot.rotate(1);
        robot.applyChanges();
        expect(robot.orientation).toEqual(robot.predictedOrientation);
    });
});


describe("resetChanges", () => {

    test("should reset predicted position to current position", () => {
        robot.move(1);
        robot.resetChanges();
        expect(robot.predictedPosition).toEqual(robot.position);
    });

    test("should reset predicted orientation to current orientation", () => {
        robot.rotate(1);
        robot.resetChanges();
        expect(robot.predictedPosition).toEqual(robot.position);
    });
});