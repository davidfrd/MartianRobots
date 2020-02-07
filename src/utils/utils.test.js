const Utils = require('./utils');

describe("Utils tests", () => {
    test("Should convert Numbers in String format to Number and leave Strings as Strings", () => {
        const NaNString = "thisIsNotANumber";
        expect(Utils.convertStringsIntoNumber(NaNString)).toBe(NaNString);
        expect(Utils.convertStringsIntoNumber("1")).toBe(1);
    });
});