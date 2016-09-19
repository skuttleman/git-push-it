module.exports = {
  const lyric = {
    pushIt: `
      ___           ___           ___           ___                                ___
     /\  \         /\__\         /\  \         /\__\                   ___        /\  \
    /::\  \       /:/  /        /::\  \       /:/  /                  /\  \       \:\  \
   /:/\:\  \     /:/  /        /:/\ \  \     /:/__/                   \:\  \       \:\  \
  /::\~\:\  \   /:/  /  ___   _\:\~\ \  \   /::\  \ ___               /::\__\      /::\  \
 /:/\:\ \:\__\ /:/__/  /\__\ /\ \:\ \ \__\ /:/\:\  /\__\           __/:/\/__/     /:/\:\__\
 \/__\:\/:/  / \:\  \ /:/  / \:\ \:\ \/__/ \/__\:\/:/  /          /\/:/  /       /:/  \/__/
      \::/  /   \:\  /:/  /   \:\ \:\__\        \::/  /           \::/__/       /:/  /
       \/__/     \:\/:/  /     \:\/:/  /        /:/  /             \:\__\       \/__/
                  \::/  /       \::/  /        /:/  /               \/__/
                   \/__/         \/__/         \/__/                                       `
  }

  lyrics: function() {
    return [
      { lyric: lyric.pushIt, timeout: 785 },
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
    return 'git push ' + args.join(' ');
  }
};
