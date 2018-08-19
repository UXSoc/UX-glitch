/*
 Sound set-up
 */
var ffmpeg = require('ffmpeg');
var googleTTS = require('google-tts-api');
var download = require('download-file');


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
var auth = require('./auth.json');

const bot = new Discord.Client({});


//global so the on message function can use it
var quotes_text = [];

// Second on ready is to get quotes text async
bot.on('ready', () => {
    const quotes_channel = bot.channels.find('name', "quotes");

    if (quotes_channel != null) {
        const quotes = quotes_channel.fetchMessages()
            .then(function (messages) {
                messages.array().forEach( function(element) {
                    quotes_text.push(element.content);
                });
            })
            .catch(function (error) {
            });
    } else {
    }
});

/*
 Commands block, they do not need to be declared as an actual var
 */


var on = false;
bot.on('message', async message => {
    test.oncall(message);
});

var test = new Command(
    "dink-on",
    "posts the best gif in the world",
    function (message) {
        if (on) {
            message.channel.send("Please wait your turn, dink is busy right now");
            return;
        }

        on = true;
        var voiceChannel = message.member.voiceChannel;
        if (voiceChannel === undefined) {
            message.channel.send("Please enter a channel to hear dis");
            return;
        }
        const broadcast = bot.createVoiceBroadcast();

        console.log("pk");
        voiceChannel.join().then(connection =>{
            var to_say = "get dinked on ";
            to_say += message.content.substring(0, 150);
            console.log(to_say);

            googleTTS(to_say, 'en', 1)
                .then(function (url) {
                    var options = {
                        directory: "./sounds/",
                        filename: "temptalk.mp3"
                    };

                    download(url, options, function(err){
                        if (err) {

                        }

                        broadcast.playFile('sounds/diiiink.mp3');
                        var dispatcher = connection.playBroadcast(broadcast, {volume: 0.5});

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
                    console.error(err.sta);
                });

        }).catch(console.error);
    });



// Needs to be last so other methods are pre-loaded
bot.login(auth.token);
