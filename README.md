# Git Push-It

This is a simple git plugin that plays appropriate music while pushing your code.

This plugin requires `git > 1.8.2` and `node.js > 4.0`.

This plugin currently only supports mac OSX.

## HTTP/HTTPS Remotes

Using this plugin with a remote via http/https, requires you to login with username and password and
use git's credential helper.

```bash
$ git config --global credential.helper cache
```

For more on credential caching with git, view the
[documentation](https://git-scm.com/docs/gitcredentials).

## Install or Update

To install, simply copy and paste the following into your terminal.

```bash
$ npm install git-push-it -g
```

## Usage

### Include arguments and flags

It passes arguments and flags to git push. If no remote and branch are specified, git-push-it
defaults to remote origin and branch master.

```bash
$ git push-it #git push origin master
$ git push-it some-remote some-branch --some-flag
```

### Declare which song to play

You can set which song to play with the `--anthem` flag.

```bash
$ git push-it --anthem=limit
```

### List available songs

```bash
$ git push-it --list
```

### Check version

```bash
$ git push-it --version
```
