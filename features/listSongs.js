var joinPath = require('path.join');
var promise = require('../utils/promise');

function listSongs() {
  var dir = joinPath(__dirname, '/../songs');
  return promise.readDirectory(dir).then(getSongs);
}

function getSongs(files) {
  return files.filter(function(file) {
    return file.match(/.*\.config\.json/);
  }).map(function(file) {
    return file.replace(/\.config\.json/, '');
  });
}

module.exports = listSongs;
