(function() {
  var Base, Client, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Client = require('./breathe-easy/client');

  Base = require('./breathe-easy/base');

  Base = (function(_super) {
    __extends(Base, _super);

    function Base() {
      _ref = Base.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Base.extend = function(endpoints) {
      var klass, _ref1;
      return klass = (function(_super1) {
        __extends(klass, _super1);

        function klass() {
          _ref1 = klass.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        klass.endpoints(endpoints);

        return klass;

      })(this);
    };

    return Base;

  })(Base);

  Client = (function(_super) {
    __extends(Client, _super);

    function Client() {
      _ref1 = Client.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Client["new"] = function(endpoint, setup) {
      var client;
      client = new Client();
      client.endpoint = endpoint;
      client.setup = setup;
      return client;
    };

    Client.prototype.addEndpoint = function(endpoints) {
      var klass;
      klass = Base.extend(endpoints);
      klass.prototype.client = this;
      return klass;
    };

    return Client;

  })(Client);

  if (typeof window !== 'undefined') {
    window.Smoother = Client;
  }

  module.exports = Client;

}).call(this);
