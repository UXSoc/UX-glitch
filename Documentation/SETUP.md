# Setup

This tutorial will cover how to setup the repo so it can integrate with Glitch.

## What You Need

- Make a [GitHub](https://github.com/) account if you don't already have one.
- Add a [SSH Key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to your GitHub account, if haven't.
- Install [Node.js](https://nodejs.org) on your computer locally.
- Make an account over at [Glitch.com](https://glitch.com/) by clicking 'Sign in' -> 'Sign in with GitHub' and login into GitHub.

![Sign up link in glitch](/Documentation/img/github-glitch.png)

- Some way to use [Git](https://git-scm.com/), and a text editor or IDE.

## Creating Repos
- Fork this repo by clicking the button in the upper right, it should be public. Making a private fork won't really do anything as Glitch projects are public.

![Fork this repo](/Documentation/img/fork-glitch.png)

- Make a new **private** repository which you can do by going to [here](https://github.com/), to store the API keys. I recommend calling it 'api-keys'.

## Clone Both Locally

To make sure that GitHub is setup correctly, run in terminal:
 
 `git clone git@github.com:[replace with your username]/api-keys.git`
 
For example mine is:

`git clone git@github.com:jhburns/api-keys.git`

Which will only be able to download the private repo if you have correctly set up access.  

If you are unsure of your repo name to use, it is under the 'Clone or Download' button on Github. Also click the toggle to 'Use SSH'.

![Clone here](/Documentation/img/clone-through-github.png)

After that, clone your fork of this repo:

 `git clone git@github.com:[replace with your username]/ux-glitch.git`
 
 ## 


