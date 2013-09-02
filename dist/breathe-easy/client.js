(function() {
  var Client, settings;

  settings = {
    usePromises: true
  };

  Client = (function() {
    function Client(_arguments) {
      this["arguments"] = _arguments;
      this.usePromises = $.extend(true, settings, this["arguments"]).usePromises;
      this.setup();
    }

    Client.prototype.setup = function() {};

    Client.prototype.usePromises = function(usePromises) {
      if (typeof usePromises === void 0) {
        return settings.usePromises = true;
      } else {
        return settings.usePromises = usePromises;
      }
    };

    return Client;

  })();

  module.exports = Client;

}).call(this);
