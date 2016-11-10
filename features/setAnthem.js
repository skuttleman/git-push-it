var listSongs = require('./listSongs');
var random = require('../utils/random');

module.exports = function() {
  return listSongs().then(function(songs) {
    var args = process.argv.slice(2);
    var arg = getAnthem(process.argv.slice(2));
    if (arg) return format(arg, args, songs);
    return { anthem: random(songs), args: args };
  });
};

function getAnthem(args) {
  return args.find(function(arg) {
    return arg.match(/^--anthem=/);
  });
}

function verifyAnthem(arg, songs) {
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

function format(arg, args, songs) {
  return {
    anthem: verifyAnthem(arg, songs) || random(songs),
    args: filterArgs(args)
  };
}
