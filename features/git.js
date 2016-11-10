var reFind = require('../utils/reFind');
var promise = require('../utils/promise');

function login(config) {
  return promise.exec('git remote -v').then(function(remotes) {
    var commands = parseCommands(config.args, remotes.split('\n'));
    return commands.reduce(function(chain, command) {
      return chain.then(function() {
        return promise.exec(command);
      });
    }, Promise.resolve());
  }).then(promise.wrap(config));
}

function push(args, callback) {
  var command = ['git push'].concat(args).join(' ');
  return promise.exec(command, callback);
}

function loginCommands(url) {
  return [
    'echo "\\n\\n" | git credential reject',
    'echo "url=' + url + '\\n\\n" | git credential fill | git credential approve'
  ];
}

function parseCommands(args, remotes) {
  var remote = reFind(args, /^[^-]/) || 'origin';
  var remoteVerbose = reFind(remotes, new RegExp('^' + remote + '.*(push)'));
  var remoteUrl = remoteVerbose.split(/\s/)[1];
  if (remoteUrl.slice(0, 4) === 'http') {
    return loginCommands(remoteUrl, args);
  }
  return [];
}

module.exports = {
  login: login,
  push: push
};
