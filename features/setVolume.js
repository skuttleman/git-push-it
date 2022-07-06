module.exports = function (config) {
  // volume is a number between 0 and 1
  var volumeArg = getVolume(config.args);
  var volume = verifyVolume(volumeArg) || 1;

  return {
    ...config,
    args: filterArgs(config.args),
    volume
  };
};

function getVolume(args) {
  return args.find(function (arg) {
    return arg.match(/^--volume=/);
  });
}

function verifyVolume(arg) {
  if (!arg) return;
  return arg.split('=')[1];
}

function filterArgs(args) {
  return args.filter(function (arg) {
    return !arg.match(/^--volume=/);
  });
}
