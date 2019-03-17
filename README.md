# Simple Server
A glitch integrated webserver with continuous integration. 

- **npm i** to install, run first if already set-up
- **npm run update** after committing to update glitch and push that commit
- **npm start** run locally, for testing 

## Node
First install Node, https://nodejs.org/en/ which should come with npm that should be used to install with `npm i`

## Bot Hosting
This template is largely designed with free hosting over at [Glitch](https://glitch.com) in mind.
Make an **account** and then a new project, which one doesn't matter.

## Make Private Repo

1. Make another private repo, call it 'api-keys' and run `npm init` in it, you can just mash enter for the prompts
1. Copy the file "glitch-config.json" with the same name and contents over to this repo
1. In package.json in the original repo, 'UX-glitch', change this line so it is your Github username instead:
```
  "optionalDependencies": {
    "api-keys": "git+ssh://git@github.com/[Your Username]/api-keys.git"
  }
```

### Setup

1. Open Dev tools with Right-click > Inspect and then go to the Network Tab in the Glitch page
1. Click on the project name in the upper right and then 'Advanced Options'
1. Click on the upper right on the project name
1. Select Import from github, give access, and type in the username/repo as indicated
1. In Network there should be an entry after downloading the repo to glitch that says `githubImport?authori...`
1. Click on it and scroll to the Bottom where it says 'Query String Parameters' 
1. Copy them in the same format to the other api-keys repo, in the glitch-config file 
1. Commit and push the api-keys folder
1. Run `rm /node_modules -rf` in this project and then rerun `npm i` 

If everything worked you should be able to update to glitch automatically with `npm run update` (which also will git push for you).

## Api Security
This package also proposes a easy and fast way to keep track of API keys even if this is a public repo.

Added them the a private repo, in the same format as the template /api-keys folder and add the private repo under optionalDependencies in the package.json file.

This way there is no hassle while developing and they are still safe.

You can also add other people working on the project as a 'collaborator' in Github settings to allow them the update the bot. 

## Uptime
The bot will likely go idle if webhooks are not used because glitch shutdowns bots after 5min of inactivity. Part of the bot script pings itself to prevent it from getting shut-down.

It is also recommended to have https://uptimerobot.com/ ping the site every 5min too.

Keep in mind the url for local is http://[name].gltich.me/, and the same for uptimerobot although you can use https. 


## Running Server

Simply run the command `npm start`. 
