const Application = require('./app');
const fs = require('fs');
const util = require('util');
const Config = require('./config/config');

describe("Application test", () => {
    test("Should generate correct output", () => {
        let promises = [];
        const readFilePromise = util.promisify(fs.readFile)
        promises.push(readFilePromise('examples/output.txt', Config.encoding));
        promises.push(Application.run('examples/input.txt'));
        Promise.all(promises).then(
            ([resultA, resultB]) =>  expect(resultA).toEqual(resultB)
        )
    });
 
});