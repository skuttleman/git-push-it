module.exports = function(songList) {
  var args = process.argv.slice(2);
  var song = getSong(args);
  if (hasList(args)) {
    listSongs(songList);
  } else if (song) {
    args = stripSong(args);
  }
  return { args: args, song: song };
};

function getSong(args) {
  var song = null;
  args.find(function(arg, i) {
    if (arg === '--anthem') song = args[i + 1] || null;
    else if (arg.match(/^--anthem=/)) song = args[i].replace(/^--anthem=/, '') || null;
  });
  return song;
}

function hasList(args) {
  return args.find(function(arg) {
    return arg === '--list';
  });
}

function listSongs(songList) {
  console.log('Available songs:');
  songList.forEach(function(song) {
    console.log(song);
  });
  process.exit();
}

function stripSong(args) {
  var start = args.findIndex(function(arg) {
    return arg.match(/^--anthem/);
  });
  var end = start;
  if (args[start] === '--anthem') {
    end = start + 1;
  }
  return args.slice(0, start).concat(args.slice(end + 1));
}
