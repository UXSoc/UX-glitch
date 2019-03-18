# Extras

There are a lot of interesting thing you can do with this project, for example https://github.com/UXSoc/UX-glitch/ automatically deploys to https://golden-break.glitch.me/ after every `git push`.

## Basic DevOps

Here is an example of a potential basic workflow:

1. Make changes in Glitch's editor.
1. Backport the changes with 'Ctrl-A' -> Copy in a file in Glitch, then 'Ctrl-A' -> Paste into an editor locally.
1. Git commit, push those changes.
1. Run `npm run sync`.
1. Check back on Glitch to see that everything was uploaded to GitHub properly.

## Prevent App from Sleeping

One of the disadvantages of Glitch is that every app automatically sleeps after 5 minutes.
I recommend [freshping](https://www.freshworks.com/website-monitoring/) so that
your app never goes offline. Just add the direct url, ie 'project-name.glitch.me' and 
set it to ping every minute. Easy!

## Adding More API Keys

Additional secrets can be added to the 'api-keys' repo, and then added directly to the *.env* file on Glitch.
Then you can add a bit of logic to check for either file like I do in my Discord bot: [here](https://github.com/jhburns/val-bot/blob/f6756bbd6c084d30a9bace562f032f0d07489f15/bot.js#L77).
Now you don't have to manage additional keys.

Note: the *.env* file is one of the only files that isn't overwritten when a project is imported from Git. 

## Adding Collaborators
Glitch.com lets you Share -> 'Invite Others to Edit' to collaborate on a project, but what 
if you both want to work locally? You can simply go to Settings -> Collaborators in the 
'api-keys' repo page and invite them there too. Now just have them run `npm i` after 
downloading this project and they can deploy changes to Glitch or use the same API tokens
to test. 

**Warning**: sharing any secrets may compromise your security, see [security implications](https://github.com/UXSoc/UX-glitch/blob/master/Documentation/SECURITY_WARNING.md).
 
![Inviting friends](/Documentation/img/invite.png)

#### Enjoy coding with friends

# Integrate with Travis CI

By using [Travis CI](https://travis-ci.com/) you can expand the possibilities for CD/CI. As mentioned this
project is deployed after every push, and it is also *redeployed daily* in case someone was
messing around in the editor. 

The *.travis.yml* file is a template that integrates with this project, although secure values need 
to be changed.

## What You Need

- Sign-up to [Travis](https://travis-ci.com/) with GitHub.
- Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/) locally.

Note: this tutorial is largely based on [this one](https://github.com/alrra/travis-scripts/blob/master/docs/github-deploy-keys.md)
which you may want to reference if you get stuck.

## Generate Keys
It is not required, but it is recommended, to do these next steps in the local 'api-keys' folder so 
the private key can avoid being leaked.

1. Make a new folder, like *travis_keys* in the 'api-keys' repo folder.
1. Run the command: `ssh-keygen -t rsa -b 4096 -C "[your_email]" -f travis -N ''`.  in that folder.
1. You should have two files: *travis*, and *travis.pub*.
1. Go to Setting -> Deploy Keys and add the *travis.pub* file's text to GitHub.

    ![How to add keys](/Documentation/img/deploy-key.png)
    
1. Install the Travis client with `gem install travis` and login to Travis with `travis login`.
1. Run `travis encrypt-file travis`, which will upload the encryption key, and iv for you.
1. Copy the *travis.enc* file that should've been generated in the 'api-keys' repo, into the *api-keys/* folder in this repo.
1. Next take the `travis_XXXXXXXX_key` and `travis_XXXXXXXX_iv` and substitute them into the 
second `before-command` line: [here](https://github.com/UXSoc/UX-glitch/blob/61fef3c7f967e1e8c163ffe700a47c4b1fc7294b/.travis.yml#L18)

1. Run `travis encrypt -r "[your username]/UX-Glitch" GH_USER_EMAIL="[your email]" GH_USER_NAME="[your username]"`

1. Copy-paste the `secure: AB..` value that is returned into the `secure` line [here](https://github.com/UXSoc/UX-glitch/blob/61fef3c7f967e1e8c163ffe700a47c4b1fc7294b/.travis.yml#L12).
 
1. Git commit, push, check to see if Travis is able to deploy your app. If so, you're done!

### Troubleshooting
Here is what a successful build, and deploy looks like: https://travis-ci.com/UXSoc/UX-glitch/builds/104726741 

- Were the key and iv values uploaded correctly? Try uploading them manually by using the `--print-key` argument on step 6.
- Did you make sure to copy *travis.enc*?
- Were the key and iv variable names substituted correctly, they both lead with a `$` and don't have an extra space before the end quote? 

## Add Testing

You can conveniently add testing, and stop deployment if the current
project doesn't pass tests, by changing the `scripts` line: [which only 'returns' 0 now](https://github.com/UXSoc/UX-glitch/blob/61fef3c7f967e1e8c163ffe700a47c4b1fc7294b/.travis.yml#L26).

## Reset Regularly

One of the disadvantages of Glitch is that it isn't consistent and anyone who can edit can mess up
the app. A way to mitigate this is to set Travis to run the build daily, which redeploys daily.

Go to More Options -> Settings -> Cron Jobs (at the bottom).

Set the interval to 'daily' and click add. 

![Adding a Cron job](/Documentation/img/travis-daily.png)

### Any More Ideas? Make a [Pull Request](https://github.com/UXSoc/UX-glitch/pulls)  
