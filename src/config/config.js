module.exports = {
    encoding: 'utf8',
    instructionsFile: {
        fileName: process.stdin.fd,
        returnCarriageCharacter: '\n',
    },
    marsUpperLeftCornerSeparator: ' ',
    robotInitialStatusSeparator: ' ',
    robotInstructionsSeparator: ''
}