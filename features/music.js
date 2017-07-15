var joinPath = require('path.join');
var log = require('../utils/log');
var promise = require('../utils/promise');

function play(song, callback) {
  var file = joinPath(__dirname, '/../songs/mp3s/' + song + '.mp3');
  return promise.exec('afplay ' + file, callback);
}

function lyrics(song) {
  return getConfig(song).then(function (lyrics) {
    return Promise.all(lyrics.map(timed));
  });
}

function timed(lyric) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(log(lyric.lyric));
    }, lyric.timeout);
  });
}

function getConfig(song) {
  var file = joinPath(__dirname, '/../songs/' + song + '.config.json');
  return promise.readFile(file).then(JSON.parse).then(function (data) {
    return data.lyrics;
  });
}

module.exports = {
  play: play,
  lyrics: lyrics
};
