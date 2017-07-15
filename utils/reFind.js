module.exports = function (array, regex) {
  return array.find(function (element) {
    return element && element.match && element.match(regex);
  });
};
