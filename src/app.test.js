const Application = require('./app');
const fs = require('fs');
const util = require('util');
const Config = require('./config/config');

describe("Application test", () => {
    test("Should generate correct output", async () => {
        const expectedOutput = fs.readFileSync('./examples/output.txt', Config.encoding);
        const output = await Application.run('./examples/input.txt');
        expect(output).toEqual(expectedOutput);
    });

});