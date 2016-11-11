module.exports = function(messages) {
  logMessages([].concat(messages));
};

function logMessages(messages) {
  messages.forEach(function(message) {
    if (message instanceof Array) {
      logMessages(message);
    } else if (message && message.trim && message.trim()) {
      process.stdout.write(message);
    }
  })
}
