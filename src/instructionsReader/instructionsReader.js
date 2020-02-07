const fs = require('fs')

class InstructionsReader {

    static async getInstructionsList() {
        let content = fs.readFileSync('src/instructions.txt', 'utf8');
        return content.split("\r\n");
    }

}

module.exports = {
    InstructionsReader
}