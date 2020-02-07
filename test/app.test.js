const {Robot} = require('../src/marsMission/robot/robot');


describe("Robot", () => {
    test("Should create robot", () => {
        const robot = new Robot(1, 2, "N");

        expect(robot.getPosition()).toEqual({x:1, y:2});
        expect(robot.getOrientation()).toEqual("N");
        expect(robot.getPredictedPosition()).toEqual({x:1, y:2});
        expect(robot.getLost()).toEqual(false);
    });

    
})