# Security

There are some security issues related to how GitHub's and Glitch's API works, which may make some aspects less then ideal. As a result you may want to limit your workflow implementation and reconsider which collaborators/platforms you trust.
Do not use this template for any work with any potential serious implication of violated security.

## Warning

You are solely responsible for managing all of your security, including authorization, and project id tokens. 
Do not be careless with any private/secret information. Use at your own risk.

You may want to consider using [Two-Factor Authentication](https://help.github.com/en/articles/securing-your-account-with-two-factor-authentication-2fa).
You may want to consider setting up a developer token to work as way to potentially alert you if keys are leaked, follow [this tutorial](https://github.com/UXSoc/UX-glitch/blob/master/Documentation/EXTRAS.md#improve-security).

## Issues
 
### GitHub Private Repos

Keeping private keys in private GitHub repos is relatively secure, as users are authenticated through RSA. However, in the Settings tab, there is an option to make the repository public. Clicking that button is dangerous and would publish your keys so it should be considered a risk.

### Collaborators

Private repos also have the ability to add 'Collaborators' to them, which is an easy way to share secret keys. However it will give
unrestricted access to ALL of your keys, even if you do not want a user to have access to all of them.

Consider making multiple private repositories, and only allowing a Collaborator access to the ones you allow.
This can be done by just adding another entry under the 'optionalDependencies' field in *package.json*. 
For example, the 'api-keys' repo may only have keys for syncing to Glitch, while a new 'my-app-secrets' repo 
would have keys for communication with a third-party service. Then you can only add another user as a 
collaborator for the 'my-app-secrets' repo to prevent them from having the ability to change the production
app hosted on Glitch.

Revoking keys from Collaborators can be difficult, and if that is a priority you may want to look elsewhere.
The only know to do so is to follow this:
1. Remove the Collaborator from the private repo on GitHub.
1. Reset the api key(s) through the service, change the keys locally, and push the change to the repo.
1. Have every Collaborator who wasn't removed run the following in any project that uses the repo:
    1. `rm node_modules -rf` or similar
    1. `npm cache clean --force`
    1. `npm i`
    
This solution assumes that the service allow you to reset a key, including Glitch.

## Glitch's API
This template takes advantage of an undocumented feature of Glitch's API, which could also change at any time.
Due to this, the overall security of any implementation using this strategy should not 
be considered insecure and anyone using it should understand the risks. This is more designed for 
hobby projects and learning, no sensitive information should be involved. 

The authorization key found in the SETUP.md tutorial is a very important token, only share it with
those you trust and are guaranteed to trust in the future.

## Travis CI
Making sure that Travis CI doesn't expose your secrets is also an issue. First, double-check
that the private key used to upload to Travis isn't accidentally leaked, and the encryption
key and iv aren't public. Only use the command `npm run safe-sync` instead of `sync` so
no variables are printed to the public build log. If secrets are printed, remove the log. 