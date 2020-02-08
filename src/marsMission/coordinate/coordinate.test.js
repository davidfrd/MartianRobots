const { Coordinate } = require('./coordinate');

describe("constructor", () => {

    test("should create x and y", () => {
        const xCoord = 1;
        const yCoord = 2;
        const coordinate = new Coordinate(xCoord, yCoord);
        expect(coordinate.x).toEqual(xCoord);
        expect(coordinate.y).toEqual(yCoord);
    })

    test("should init x and y to zero by default", () => {
        const coordinate = new Coordinate();
        expect(coordinate.x).toEqual(0);
        expect(coordinate.y).toEqual(0);
    })

})