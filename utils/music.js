module.exports = {
  play: function(promiseExec, song, config) {
    return promiseExec(config.playMusic());
  },
  echoLyrics: function(config) {
    return Promise.all(config.lyrics().map(function(lyric) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve(console.log(lyric.lyric));
        }, lyric.timeout);
      });
    }));
  }
};
