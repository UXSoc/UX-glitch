# Tutorial
This tutorial will walk though how to set up and use the site. It assumes you already have a Discord and Github account.

### Cleaning
It is recommended to delete most of the media in the project (profile.jpg, /img and /sounds) cause they are for personal enjoyment and are silly. 

A large amount of the bot.js script can also be deleted (All of the Command Objects, a lot of the random statements) and package.json can be trimmed to you're liking.

## Node
First install Node, https://nodejs.org/en/ which should come with npm that should be used to install with `npm i`

## Make the App
After logging into https://discordapp.com/developers/applications/ and click 'create a new application'. Fill in the usual info, so tips:
- Save the bot icon to the project in case you need it later
- Change the name or else you will be stopped from making a Bot

After that go to the Bot tab and make a new one. Get the Token, it will be needed later


Next I would advise making a test server or private channel to develop the bot.
To add the bot, you first need admin abilities for the server and to go to https://discordapp.com/oauth2/authorize?&client_id=[BOT ID HERE]&scope=bot&permissions=8

The id is also on the General Information page. The permission number is set to admin for now because you may never know what you need.

##### It is very important to change the permission number later, which can be found on the bot page

## Lets Get Started
Now the bot can be run, create a file named '.env' in the root and add the line:
```
TOKEN='[insert token from discord here]'
```
This file should NOT be committed because of security reasons, this will be covered later in detail.

Next run `npm start` and the bot should connect
From here you can start editing and tweaking the bot.

## Bot Hosting
This template is largely designed with free hosting over at [Glitch](https://glitch.com) in mind.
After making an account, make a new project, which one doesn't matter.

This next step is very important so be careful. 

1. Open Dev tools with Right-click > Inspect and then go to the Network Tab
1. Click on the project name in the upper right and then 'Advanced Options'
1. Select Import from github, get access, and type in the username/repo as indicated
1. In Network there should be an entry after downloading the repo to glitch that says `githubImport?authori...`
1. Click on it and scroll to the Bottom where it says 'Query String Parameters'
1. Copy the sync-config.json file in to this bot's root folder and copy all the values into it

If everything worked you should be able to update to glitch automatically with `npm run update` (which also will git push for you).

Also make sure to copy the same TOKEN='' from local to glitch's .env or else you will get an error.  

## Api Security
This package also proposes a easy and fast way to keep track of API keys even if this is a public repo.

Added them the a private repo, in the same format as the template /api-keys folder and add the private repo under optionalDependencies in the package.json file.

This way there is no hassle while developing and they are still safe.


## Uptime
The bot will likely go idle on Discord because glitch shutdowns bots after 5min of inactivity. Part of the bot script pings itself to prevent it from getting shut-down.

It is also recommended to have https://uptimerobot.com/ ping the site every 5min too.

Keep in mind the url for local is http://[name].gltich.me/, and the same for uptimerobot although you can use https. 

