var git = require('./git');
var listSongs = require('./listSongs');
var random = require('../utils/random');

module.exports = function() {
  return Promise.all([
    listSongs(),
    git.wipPush()
  ]).then(decideSong);
};

function decideSong(items) {
  var args = process.argv.slice(2);
  var songs = items[0];
  var wip = items[1];
  var arg = getAnthem(args);
  if (arg) return format(arg, args, songs);
  else if (wip) return { anthem: random(isWip(songs)), args: args };
  return { anthem: random(notWip(songs)), args: args };
}

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
    anthem: verifyAnthem(arg, songs) || random(notWip(songs)),
    args: filterArgs(args)
  };
}

function isWip(songs) {
  return songs.filter(function(song) {
    return song.match(/wip/);
  });
}

function notWip(songs) {
  return songs.filter(function(song) {
    return !song.match(/wip/);
  });
}
