const Utils = require('./utils');

describe("convertStringsIntoNumber", () => {
    test("should convert Numbers in String format to Number and leave Strings as Strings", () => {
        const NaNString = "thisIsNotANumber";
        expect(Utils.convertStringsIntoNumber(NaNString)).toBe(NaNString);
        expect(Utils.convertStringsIntoNumber("1")).toBe(1);
    });
});

describe("copyObject", () => {
    test("should copy object without references", () => {
        const entity = {
            valueA: "valueA",
            valueB: "valueB"
        };
        const copiedEntity = Utils.copyObject(entity);
        expect(copiedEntity).not.toBe(entity);
        expect(copiedEntity).toMatchObject(entity);
    });
})