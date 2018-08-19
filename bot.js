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

    //name should be string, oncall should be function
    constructor(name, oncall) {
        this.name = name;
        this.oncall = oncall;
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
var auth = require('./auth.json');

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

bot.on('message', async message => {
    var text = message.content;

    if (text.substring(0, 1) == '!') {
        var args = text.substring(1).split(' ');
        var cmd = args[0];
        console.log(cmd);

        console.log(args);
    } else if (text.indexOf("and") >= 4 && text.indexOf("and") <= text.length - 7 && text.length <= 30 && text.substring(0, 1) != '`') {
        message.channel.send('```' + text + ' and PAINTING!```');
    }
});



// Needs to be last so other methods are pre-loaded
bot.login(auth.token);
