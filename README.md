# Simple Server
A glitch integrated webserver with continuous integration. 

## Node
First install Node, https://nodejs.org/en/ which should come with npm that should be used to install with `npm i`

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
The bot will likely go idle if webhooks are not used because glitch shutdowns bots after 5min of inactivity. Part of the bot script pings itself to prevent it from getting shut-down.

It is also recommended to have https://uptimerobot.com/ ping the site every 5min too.

Keep in mind the url for local is http://[name].gltich.me/, and the same for uptimerobot although you can use https. 


## Running Server

simply run the command `npm i` then `npm start`. 

