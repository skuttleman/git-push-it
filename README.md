# Git Push-It

This is a simple git plugin that plays appropriate music while pushing your code.

## Install

To install, simple copy and paste the following into your terminal.

```bash
$ git clone https://github.com/skuttleman/git-push-it.git ~/.git-push-it
$ ln -s ~/.git-push-it/git-push-it /usr/local/bin/git-push-it
```

## Usage

It defaults to `origin master`, but will take a `<remote>` and `<branch>`.

```bash
$ git push-it
$ git push-it some-remote some-branch
```
