var exec = require('child_process').exec;

module.exports = function(processes) {
  return function(command) {
    return new Promise(function(resolve, reject) {
      var child = exec(command, function(err, stdout, out) {
        if (err) return reject(err);
        resolve(out || stdout);
      });
      processes.push(child);
    });
  };
};
