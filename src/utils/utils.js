module.exports = {
    convertStringsIntoNumber: (string) =>  {
        return isNaN(string) ? string : Number(string);
    }
}