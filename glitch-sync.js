const config = require('./node_modules/api-keys/glitch-config.json');
const colors = require('colors');
const { exec } = require('child_process');
const args = require('args');

args
    .option("debug", "Have the glitch-sync command debug")
    .option("printcmd",    "Outputs the commands being run. " +
        "Warning: your api keys may be exposed if this flag is being used in a public area.");
const flags = args.parse(process.argv);

let command = "";

//Making the command, env vars need to be before script to have sync work correctly
command += "GLITCH_PROJECT_ID='" + config.projectID + "' ";
command += "GLITCH_TOKEN='" + config.authorization + "' ";
command += "GH_REPO='" + config.repo + "' ";
if (flags.debug) {
    command += " DEBUG=sync-glitch* ";
}
command += "./node_modules/.bin/sync-glitch";


if (flags.printcmd) {
    console.log(command.dim);
}

exec(command, (err, stdout, stderr) => {
    if (err) {
        console.log("Error: could not run command, make sure that sync-config is correct".red);

        if (flags.printcmd) {
            console.log("Error message: ".red + err.message);
        } else {
            console.log("Error message not printed to hide security keys, rerun locally with --command_print to see full error");
        }
        return;
    }

    let out_color = colors.green;

    //if statements needed to prevent extra lines if no error or out
    if (stdout !== "") {
        console.log(stdout.green);
        console.log( + ' repo: ' + config.repo.bold);
    }

    if (stderr !== "") {
        console.log(stderr.red);
        out_color = colors.red;
    }

    console.log(out_color("Done"));
});

