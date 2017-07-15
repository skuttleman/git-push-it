module.exports = function (pattern) {
  return process.argv.find(function (arg) {
    return arg.match(pattern);
  });
};
