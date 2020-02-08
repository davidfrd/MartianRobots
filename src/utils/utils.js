module.exports = {
    convertStringsIntoNumber: (string) => {
        return isNaN(string) ? string : Number(string);
    },
    copyObject: incomingObject => Object.assign(Object.create(Object.getPrototypeOf(incomingObject)), incomingObject)
}