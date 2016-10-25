Array.prototype.findIndex = Array.prototype.findIndex || function (condition) {
  for (var i = 0; i < this.length; i++) {
    if (condition(this[i], i, this)) return i;
  }
  return -1;
};
