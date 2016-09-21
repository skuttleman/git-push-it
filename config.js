module.exports = {
  lyrics: function() {
    return [
      { lyric: 'Push it.', timeout: 785 },
      { lyric: 'Push it good.', timeout: 2725 },
      { lyric: 'Push it.', timeout: 4725 },
      { lyric: 'Push', timeout: 6000 },
      { lyric: 'it', timeout: 6250 },
      { lyric: 'REAL', timeout: 6525 },
      { lyric: 'GOOD!', timeout: 7000 }
    ];
  },
  playMusic: function() {
    return 'afplay ~/.git-push-it/pushit.mp3';
  },
  gitPush: function(args) {
    if (args.length) {
      return 'git push ' + args.join(' ');
    }
    return 'git push origin master';
  },
  gitLogin: gitLogin
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
