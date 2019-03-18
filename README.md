[![Build Status](https://travis-ci.com/UXSoc/UX-glitch.svg?branch=master)](https://travis-ci.com/UXSoc/UX-glitch)

# Glitch Sync Template

[Glitch](https://glitch.com/) is a super cool platform that lets you edit, collaborate, and publish your [Node.js](https://nodejs.org/) apps. It does have [GitHub](https://github.com/UXSoc/UX-glitch) support but lacks a lot of features.

This is a template to enable a lot of extra functionality, and is great way to learn CD/CI.

Glitch is perfect for bots, small projects, and fun apps. Here's why you should consider using this template: 
### Pros

- Free as in pizza 🍕 and source code 📖, by hosting on Glitch.
- Relatively easy to setup, with full and extendable control over how deployments work. 
- Gets all the benefits of Glitch (collaboration, live code) with a convenient way to reset changes after saving them through GitHub.

### Cons

- Only supports Node.js.
- Glitch has some resource [restrictions](https://glitch.com/help/restrictions/) in place, although they are hard to hit or can be circumvented.
- Glitch API is unfortunately not dependable, use at your own risk.

## How To Use

For basic usage, run `npm i`, then `npm start` to get a web server.

Start with a [tutorial to setup with Glitch](https://github.com/UXSoc/UX-glitch/blob/master/Documentation/SETUP.md).

If you want know what else you can do check out [extras](https://github.com/UXSoc/UX-glitch/blob/master/Documentation/EXTRAS.md#extras) to customize your workflow.

Consider [security implications](https://github.com/UXSoc/UX-glitch/blob/master/Documentation/SECURITY_WARNING.md#security).

## Commands After Setup

- `npm run sync` will make Glitch redeploy the project to the current main branch of this GitHub repo.
- `npm run safe-sync` does the same as `sync`, but the command being run isn't printed to console, which hides the secret variables. Ideal for Travis CI, or any public place sync is being ran.
- `npm run update` with run `git push`, then `sync` for you. Simplifies deploying changes from 2 commands to 1.  

## About
Made by Jonathan Burns, enjoy the 🐟🐟

Feel free to open a Pull request ⬆️. 