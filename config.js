var configs = ['garbage', 'limit', 'pushit', 'pushitup', 'staticx'];
var randomSong = getRandomItem(configs.map(requireConfig));

module.exports = {
  gitPush: function(args) {
    if (args.length) {
      return 'git push ' + args.join(' ');
    }
    return 'git push origin master';
  },
  gitLogin: gitLogin,
  lyrics: randomSong.lyrics,
  playMusic: function() {
    return 'afplay ~/.git-push-it/songs/mp3s/' + randomSong.name + '.mp3';
  }
};

function reFind(array, regex) {
  return array.find(function(item) {
    return item.match(regex);
  });
}

function loginCommands(url, args) {
  return [
    'echo "\\n\\n" | git credential reject',
    [
      'echo "url=' + url + '\\n\\n"',
      'git credential fill',
      'git credential approve'
    ].join(' | ')
  ];
}

function gitLogin(args, remotes) {
  var remote = reFind(args, /^[^-]/) || 'origin';
  var remoteVerbose = reFind(remotes, new RegExp('^' + remote + '.*(push)'));
  var remoteUrl = remoteVerbose.split(/\s/)[1];
  if (remoteUrl.slice(0, 4) === 'http') {
    return loginCommands(remoteUrl, args);
  }
  return [];
}

function getRandomItem(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

function requireConfig(name) {
  return {
    name: name,
    lyrics: require('./songs/' + name + '.config')
  };
}
