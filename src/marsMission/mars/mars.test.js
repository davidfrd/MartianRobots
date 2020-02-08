const {Mars} = require('./mars');
const {Coordinate} = require('../coordinate/coordinate');




describe("constructor", () => {
    const coordX = 4;
    const coordY = 5;
    const mars = new Mars(coordX, coordY);

    test("should create rigth upper corner with passed values", () => {
        expect(mars.rightUpperCorner).toMatchObject(new Coordinate(coordX, coordY));
    });

    test("should create left bottom corner with 0, 0", () => {
        expect(mars.leftBottomCorner).toMatchObject(new Coordinate(0, 0));
    });

});

describe("getLeftBottomCorner", () => {
    
    test("should return left bottom corner", () => {
        const mars = new Mars(5, 5);
        expect(mars.getLeftBottomCorner()).toEqual(mars.leftBottomCorner);
    });
});

describe("getRightUpperCorner", () => {
    
    test("should return right upper corner", () => {
        const mars = new Mars(5, 5);
        expect(mars.getRightUpperCorner()).toEqual(mars.rightUpperCorner);
    });
});