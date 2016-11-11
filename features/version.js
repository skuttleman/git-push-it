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
  return promise.exec('npm view git-push-it --json').then(function(json) {
    return JSON.parse(json)['dist-tags'].latest;
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

function versionInfo(versions) {
  logVersion(versions.local);
  return outdatedMessage(versions) || 'Your version of git-push-it is up to date.';
}

function outdatedMessage(versions) {
  if (versions.current > versions.local) {
    return [
      'There is a new version of git-push-it available.',
      'Run "npm update -g git-push-it" to get the newest version.'
    ];
  }
  return '';
}

module.exports = {
  checkVersion: checkVersion,
  getCurrentVersion: getCurrentVersion,
  getLocalVersion: getLocalVersion,
  logVersion: logVersion,
  outdatedMessage: outdatedMessage,
  versionInfo: versionInfo,
};
