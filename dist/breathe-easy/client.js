(function() {
  var Client;

  Client = (function() {
    function Client(_arguments) {
      this["arguments"] = _arguments;
      this.usePromises = this["arguments"].usePromises;
      this.setup();
    }

    Client.prototype.setup = function() {};

    return Client;

  })();

  module.exports = Client;

}).call(this);
