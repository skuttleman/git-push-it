var joinPath = require('path.join');
var git = require('./git');
var promise = require('../utils/promise');

function listSongs() {
  var dir = joinPath(__dirname, '/../songs');
  return Promise.all([
    promise.readDirectory(dir),
    git.wipPush()
  ]).then(function(results) {
    return getSongs(results[0], isWip(results[1]));
  });
}

function getSongs(files, onWip) {
  return files.filter(function(file) {
    return file.match(/.*\.config\.json$/i);
  }).filter(function(file) {
    if (onWip) return file.match(/wip/i);
    return !file.match(/wip/i);
  }).map(function(file) {
    return file.replace(/\.config\.json/, '');
  });
}

function isWip(onWip) {
  inArgs = process.argv.slice(2).find(function(arg) {
    return arg.match(/wip/i) && !arg.match(/anthem/);
  });
  return onWip || inArgs;
}

module.exports = listSongs;
