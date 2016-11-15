var joinPath = require('path.join');
var log = require('../utils/log');
var promise = require('../utils/promise');

function checkVersion() {
  return Promise.all([
    getCurrentVersion(), getLocalVersion()
  ]).then(versions => {
    return { current: versions[0], local: versions[1] };
  });
}

function getCurrentVersion() {
  let command = 'npm view git-push-it --json -loglevel silent';
  return promise.exec(command).then(JSON.parse).then(function(data) {
    return data['dist-tags'].latest;
  });
}

function getLocalVersion() {
  var file = joinPath(__dirname + '/../package.json');
  return promise.readFile(file).then(function(json) {
    return JSON.parse(json).version;
  });
}

function logVersion(version) {
  log('git-push-it version ' + version + '\n');
}

function outdatedMessage(versions) {
  if (versions.current > versions.local) {
    return [
      'There is a new version of git-push-it available.\n',
      'Run "npm install git-push-it -g" to get the newest version.\n'
    ];
  }
  return '';
}

module.exports = {
  checkVersion: checkVersion,
  getCurrentVersion: getCurrentVersion,
  getLocalVersion: getLocalVersion,
  logVersion: logVersion,
  outdatedMessage: outdatedMessage
};
