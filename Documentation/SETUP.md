# Setup

This tutorial will cover how to setup the repo so it can sync with Glitch.

## What You Need

- Make a [GitHub](https://github.com/) account if you don't already have one.
- Add a [SSH Key](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to your GitHub account, if haven't.
- Install [Node.js](https://nodejs.org) on your computer locally.
- Make an account over at [Glitch.com](https://glitch.com/) by clicking 'Sign in' -> 'Sign in with GitHub' and logging into GitHub.

![Sign up link in glitch](/Documentation/img/github-glitch.png)

- Have some way to use [Git](https://git-scm.com/), and a preferred text editor/IDE.

## Creating Repos
- Fork this repo by clicking the button in the upper right, it should be public. Making a private fork won't really do anything as Glitch projects are public.

![Fork this repo](/Documentation/img/fork-glitch.png)

- Make a new **private** repository which you can do by going to [here](https://github.com/), to store the API keys. I recommend calling it 'api-keys'. 
The rest of the tutorials will assume its called 'api-keys'.

## Clone Both Locally

To make sure that GitHub is setup correctly, run in terminal:
 
 `git clone git@github.com:[replace with your username]/api-keys.git`
 
For example mine is:

`git clone git@github.com:jhburns/api-keys.git`

Which will only work if you have correctly set up the SSH key.

If you are unsure of the repo name to use, it is under the 'Clone or Download' button on Github. Also click the toggle to 'Use SSH'.

![Clone here](/Documentation/img/clone-through-github.png)

After that, clone your fork of this repo:

 `git clone git@github.com:[replace with your username]/UX-glitch.git`
 
## Setup Hosting
The order these next step are done in is very important, so be careful

1. Copy *glitch-config.json* and *package.json* of the *api-keys/* folder in this repo into your 'api-keys' repo.
    - **NOT** the *travis.enc* or *README.me* file.
    - Make sure the files are in the root of the project
1. Go to [Glitch](Glitch.com) and click the 'New Project' Button -> Select any of the 'hello' options. It doesn't matter which because its going to be overwritten anyway.

    ![New project dialog](/Documentation/img/hello.png)

1. In the project editor Right-Click -> Inspect if in Chrome, or do similar in other browsers to open the Inspector.
1. Next in the lower righleftt click "Tools" -> "Git, Import and Export" -> "Import From Github" and put in the name of this repo which should be `[your username]/UX-glitch`.
1. Hit 'OK'
    
    ![Getting keys](/Documentation/img/getting-keys.png)
    
1. In the Inspector, go the the Networking tab. There should be an entry that starts with `githubImport`. Select it and scroll to the bottom of the `Headers` part of the request.
1. There should be an entry `Query String Parameters` which you should copy into the 'api-keys' repo *glitch-config.json* to their respective entries.

    ![Example of my keys](/Documentation/img/my-keys.png)
    
    > Note: thesee values are important and should be kept secure, see (here)[https://github.com/UXSoc/UX-glitch/blob/master/Documentation/SECURITY_WARNING.md#security]
1. [Git commit, git push](http://git.huit.harvard.edu/guide/), to your 'api-keys' repo.
1. In this repo, change the 'api-keys' line in *package.json* under `optionalDependencies` to your repo:
    
    `"api-keys": git+ssh://git@github.com/[your username]/api-keys.git` 

1. Run `npm i` here.
1. Make a change here, for example in *index.js* or the *README.md* then push changes.
1. Run the command `npm run sync` and check Glitch to see that it changes!

![Connected dialog](/Documentation/img/connected-glitch.png) 

#### A green 'connected' in the upper right of the Glitch editor means it worked.

## Finishing Up 

Now you should be able to reset the glitch app on command, literally. There are many ways you can use this template to do CD/CI, so look at [extras](https://github.com/UXSoc/UX-glitch/blob/master/Documentation/EXTRAS.md#extras) for inspiration.

Or you could just start editing *index.js* to add actual functionality to the project.

## Troubleshooting

There are a couple of ways this could not work, try the following:
- Check that *./node_modules/api-key/glitch-config.json* exists after running `npm i`
- Make sure you pushed all your changes in the 'api-keys' repo. Visit the repo page in the browser if needed.
- See if `npm i` is able to download the optional dependency.
- If *githubImport...* isn't available in the networks tab, try importing again. 

