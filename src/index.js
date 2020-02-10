const Config = require('./config/config');
const App = require('./app');

App.run(Config.instructionsFile.fileName).then(console.log).catch(console.error)