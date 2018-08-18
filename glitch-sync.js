debug = true

var nrc = require('node-run-cmd');
var config = require('./sync-config.json');

var command = "";

//Making the command, env vars need to be first to have sync work correctly
command += "GLITCH_PROJECT_ID='" + config.projectID + "' ";
command += "GLITCH_TOKEN='" + config.authorization + "' ";
command += "GH_REPO='" + config.repo + "' ";
if (debug) {
    command += " DEBUG=sync-glitch* ";
}
command += "./node_modules/.bin/sync-glitch";

var dataCallback = function(data) {
    console.log(data);
};

console.log(command);
nrc.run(command, { onData: dataCallback });
