var exec = require('child_process').exec;
var fs = require('fs');

function promiseExec(command, callback) {
  return new Promise(function (resolve, reject) {
    var child = exec(command, function (err, stdout, out) {
      if (err) return reject(err);
      resolve(out || stdout);
    });
    callback && callback(child)
  });
};

function promiseReadFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf-8', function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

function promiseReadDirectory(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (err, files) {
      if (err) return reject(err);
      resolve(files);
    });
  });
};

function promiseWrap(value) {
  return function () {
    return Promise.resolve(value);
  };
}

module.exports = {
  wrap: promiseWrap,
  exec: promiseExec,
  readFile: promiseReadFile,
  readDirectory: promiseReadDirectory
};
