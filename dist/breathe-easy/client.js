(function() {
  var Client, settings,
    __slice = [].slice;

  settings = {
    usePromises: true
  };

  Client = (function() {
    function Client() {
      var arguments, _arguments;
      _arguments = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this["arguments"] = _arguments;
      this.usePromises = $.extend(true, settings, this["arguments"]).usePromises;
      this.setup.apply(this, this["arguments"]);
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
