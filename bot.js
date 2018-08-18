var Discord = require('discord.io');

var logger = require('winston');
var auth = require('./auth.json');


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it needs to execute a command
    // for this script it will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            // !ping
            case 'painting':
                bot.sendMessage({ to: channelID, message: 'Busy Painting! ᶠʳᵉᵉ ᵐᵉᵉ' });
                break;
            case 'dink':
                bot.sendMessage({ to: channelID, message: '*Get dinked on* https://i.imgur.com/977QXU5.gif' });
                break;
        }
    } else if (message.indexOf("and") >= 4 && message.indexOf("and") <= message.length - 7 && message.length <= 30 && message.substring(0,1) != '`') {
        bot.sendMessage({ to: channelID, message: '```' + message + ' and PAINTING!```\n'});
    }
});