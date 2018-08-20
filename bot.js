/*
 Sound set-up
 */
var ffmpeg = require('ffmpeg');
var googleTTS = require('google-tts-api');
var download = require('download-file');

/*
 Logging block, using winston
 Use logger.info("text"); for normal text and change .info to .error for error
 */

const winston = require('winston');

const logger = winston.createLogger({
    format:  winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

/*
 Non Discord Helpers,
 They may be used by discord, but don't need it
 */

function randomID(low, high) {
    //seems dumb, but string zero is needed for padding output
    var zero = '0';
    var padding = zero.repeat(high.toString().length);
    var num = Math.floor(Math.random() * (high - low) + low);

    return (padding+num).slice(-padding.length);
}

/*
 Command class, to make adding new commands easier
 */

class Command {

    //name should be string,
    //desc should also be a string, but longer
    // oncall should be function
    constructor(name, desc, oncall) {
        this.name = name;
        this.oncall = oncall;
        this.desc = desc;
        Command.all_commands.push(this);
    }

    static init() {
        Command.all_commands = [];
    }

    static getCommands() {
        return Command.all_commands;
    }
}

//needs to be ran before any commands are made
Command.init();

/*
 Main Discord BLock
 */
const Discord = require('discord.js');

//Private repo may not be loaded

var fs = require('fs');
if (fs.existsSync('./node_modules/api-keys/auth1.json')) {
    var auth = require('./node_modules/api-keys/auth1.json');
} else {
    require('dotenv').config();
    var auth = process.env.TOKEN;
}

const bot = new Discord.Client({});

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - userID (' + bot.user.id + ')');
    logger.info('Run Instance ID: ' + '(' + randomID(0, 999999) + ')' + ' Up in: ' + process.uptime() + 'sec');
});

bot.on('error', (message) => {
    logger.info(message);
});

//global so the on message function can use it
var quotes_text = [];

// Second on ready is to get quotes text async
bot.on('ready', () => {
    const quotes_channel = bot.channels.find('name', "quotes");

    if (quotes_channel != null) {
        const quotes = quotes_channel.fetchMessages()
            .then(function (messages) {
                logger.info("Messages loaded");
                messages.array().forEach( function(element) {
                        quotes_text.push(element.content);
                });
            })
            .catch(function (error) {
                logger.error("Quote messages not loaded");
                logger.error(error);
            });
    } else {
        logger.info("Not quotes channel found");
    }
});

/*
 Commands block, they do not need to be declared as an actual var
 */



bot.on('message', async message => {
    var text = message.content;

    if (text.substring(0, 1) == '!') {
        var args = text.substring(1).split(' ');
        var cmd = args[0];

        Command.all_commands.find(function(element) {
            if (element.name === cmd) {
                element.oncall(message);
            }
        });

    } else if (text.indexOf("and") >= 4 && text.indexOf("and") <= text.length - 7 && text.length <= 30 && text.substring(0, 1) != '`') {
        message.channel.send('```' + text + ' and PAINTING!```');
    }
});

/*
 Command block, for all the ! commands
 Does not need to be set to a variable
 */

new Command(
"painting",
"check if bot is currently up",
function (message) {
    message.channel.send("Busy playing Pixel Painter! ᶠʳᵉᵉ ᵐᵉᵉ");
});

new Command(
"halp",
"gives information on commands",
function (message) {
    var help = "`Put a ! in front of each command and a space before each subcommand`\n\n";

    Command.all_commands.forEach(function (element) {
        help += '**' + element.name + '** ' + element.desc + '\n';
    });

    if (help === "") {
        logger.error("Message cannot be blank");
    }
    message.channel.send(help + "");
});

new Command(
"quote",
"says a random quote from the quotes channel",
function (message) {
    message.channel.send("```" + quotes_text[Math.floor(Math.random() * quotes_text.length)] + "```");
});

var imaging = new Command(
"dink",
"posts the best gif in the world",
function (message) {
    message.channel.send({files: ["./img/dink.gif"]});
});

var on = false
var voicing = new Command(
"dink-on",
"a command to lay ruin to your enemies",
function (message) {
    if (on) {
        message.channel.send("Please wait your turn, dink is busy right now");
        return;
    }
    on = true;

    //If not in a call, prompt
    var voiceChannel = message.member.voiceChannel;
    if (voiceChannel === undefined) {
        message.channel.send("Please enter a channel to hear dis");
        return;
    }
    const broadcast = bot.createVoiceBroadcast();

    voiceChannel.join().then(connection =>{
        var to_say = "get dinked on ";
        to_say += message.content.substring(message.content.indexOf(' '), 150);

        googleTTS(to_say, 'en', 1)
            .then(function (url) {
                var options = {
                    directory: "./sounds/",
                    filename: "temptalk.mp3"
                };

                download(url, options, function(err){
                    if (err) {
                        logger.error(err);
                    }

                    broadcast.playFile('sounds/diiiink.mp3');
                    var dispatcher = connection.playBroadcast(broadcast, {volume: 0.4});

                    dispatcher.on('start', function () {
                        var firstPromise = new Promise(function (resolve, reject) {

                            setTimeout(() => {
                                broadcast.playFile('sounds/temptalk.mp3');
                                dispatcher = connection.playBroadcast(broadcast, {volume: 0.5});
                            }, 3000);
                        });

                        var secondPromise = new Promise(function (resolve, reject) {
                            setTimeout(() => {
                                voiceChannel.leave();
                                on = false;
                            }, 7000);
                        });

                    });
                });
            })
            .catch(function (err) {
                logger.error(err);
            });

    }).catch(function (err) {
        logger.error(err)
    });
});

new Command(
"dink-all",
"posts the picture and says the thing in voice chat",
function (message) {
    var firstPromise = new Promise(function (resolve, reject) {
        voicing.oncall(message);
    });
    var firstPromise = new Promise(function (resolve, reject) {
        imaging.oncall(message);
    });
});

new Command(
"upp",
"gets how long the val has been painting for",
function (message) {

    console.log('I have been painting for about ' + getUptime());
});

function getUptime() {
    var up = process.uptime();
    var units = 'seconds';

    if (up > 60) {
        up /= 60;
        units = "minutes";
    }
    if (up > 60) {
        up /= 60;
        units = "hours";
    }
    if (up > 24 && units == "hours") {
        up /= 24;
        units = "days";
    }

    return '**' + Math.floor(up) + " " + units + '**';
}

/*
 Needs to ping itself to no get shut down
 */
const http = require('http');
const express = require('express');
const app = express();

app.listen(8080);
setInterval(() => {
    http.get(`http://hyper-date.glitch.me/`);
    // Interval needs to be less than 5min
}, 180000);

// Needs to be last so other methods are pre-loaded
bot.login(auth);
