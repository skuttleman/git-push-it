var git = require('./git');
var listSongs = require('./listSongs');
var random = require('../utils/random');

module.exports = function() {
  return listSongs().then(function(songs) {
    var args = process.argv.slice(2);
    var arg = getAnthem(args);
    return {
      anthem: verifyAnthem(arg, songs) || random(songs),
      args: filterArgs(args)
    };
  });
};

function getAnthem(args) {
  return args.find(function(arg) {
    return arg.match(/^--anthem=/);
  });
}

function verifyAnthem(arg, songs) {
  if (!arg) return;
  var anthem = arg.split('=')[1];
  return songs.find(function(song) {
    return song === anthem;
  });
}

function filterArgs(args) {
  return args.filter(function(arg) {
    return !arg.match(/^--anthem/);
  });
}
