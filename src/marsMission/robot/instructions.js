const Instructions = {
    L: robot => { robot.rotate(1) },
    R: robot => { robot.rotate(-1) },
    F: robot => { robot.move(1) }
}

module.exports = {
    Instructions
}