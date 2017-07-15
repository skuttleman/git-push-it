var joinPath = require('path.join');
var git = require('./git');
var promise = require('../utils/promise');

function listSongs(description) {
  var dir = joinPath(__dirname, '/../songs');
  return Promise.all([
    promise.readDirectory(dir),
    git.wipPush()
  ]).then(function (results) {
    return Promise.all(getSongs(results[0], isWip(results[1]), description));
  });
}

function getSongs(files, onWip, description) {
  return files.filter(function (file) {
    return file.match(/.*\.config\.json$/i);
  }).filter(function (file) {
    if (onWip) return file.match(/wip/i);
    return !file.match(/wip/i);
  }).map(function (file) {
    var name = file.replace(/\.config\.json/, '');
    if (description) {
      return getDetails(name, joinPath(__dirname, '/../songs/' + file));
    }
    return Promise.resolve(name);
  });
}

function getDetails(name, file) {
  return promise.readFile(file)
    .then(JSON.parse)
    .then(function (result) {
      return result.meta;
    }).catch(function () {
      return {};
    }).then(function (meta) {
      return name + ':   ' + meta.title + ' by ' + meta.artist;
    });
}

function isWip(onWip) {
  inArgs = process.argv.slice(2).find(function (arg) {
    return arg.match(/wip/i) && !arg.match(/anthem/);
  });
  return onWip || inArgs;
}

module.exports = listSongs;
