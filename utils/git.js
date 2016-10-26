module.exports = {
  login: function(promiseExec, args, config) {
    return promiseExec('git remote -v').then(function(remotes) {
      var promises = config.gitLogin(args, remotes.split('\n'));
      return promises.reduce(function(chain, command) {
        return chain.then(function() {
          return promiseExec(command);
        });
      }, Promise.resolve());
    });
  },
  push: function(promiseExec, args, config) {
    return promiseExec(config.gitPush(args));
  }
};
