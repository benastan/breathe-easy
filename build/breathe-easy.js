;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var BreatheEasy;

  BreatheEasy = (function() {
    function BreatheEasy() {}

    BreatheEasy.Client = require('./breathe-easy/client');

    BreatheEasy.Base = require('./breathe-easy/base');

    return BreatheEasy;

  })();

  if (typeof window !== 'undefined') {
    window.BreatheEasy = BreatheEasy;
  }

  module.exports = BreatheEasy;

}).call(this);

},{"./breathe-easy/base":2,"./breathe-easy/client":4}],2:[function(require,module,exports){
(function() {
  var Base,
    __slice = [].slice;

  Base = (function() {
    function Base(_arg) {
      this.client = _arg.client;
      this.attributes = {};
    }

    Base.prototype["new"] = function(attributes) {
      attributes || (attributes = {});
      attributes.client = this.client;
      return new this.Instance(attributes);
    };

    Base.prototype.perform = function() {
      var ajaxOptions, data, error, success, type, urlArgs, xhr, _i, _ref;
      type = arguments[0], urlArgs = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), data = arguments[_i++];
      if (!this.client.usePromises) {
        _ref = type, type = _ref.type, data = _ref.data, urlArgs = _ref.urlArgs, success = _ref.success, error = _ref.error;
      }
      if (typeof data === 'string') {
        urlArgs.push(data);
        data = void 0;
      }
      ajaxOptions = {
        type: type,
        url: this.url.apply(this, this.baseParams().concat(urlArgs)),
        data: data
      };
      xhr = $.ajax(ajaxOptions);
      this.beforeSend(xhr);
      return xhr;
    };

    Base.prototype.post = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['post'].concat(urlArgs));
    };

    Base.prototype.get = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['get'].concat(urlArgs));
    };

    Base.prototype.beforeSend = function(xhr) {};

    Base.prototype.Builder = require('./builder');

    return Base;

  })();

  Base.endpoints = function(cb) {
    var builder;
    builder = new this.prototype.Builder({
      "class": this
    });
    return cb.apply(builder);
  };

  module.exports = Base;

}).call(this);

},{"./builder":3}],3:[function(require,module,exports){
(function() {
  var Builder,
    __slice = [].slice;

  Builder = (function() {
    function Builder(_arg) {
      this["class"] = _arg["class"];
    }

    Builder.prototype.base = function() {
      var baseParams;
      baseParams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (typeof baseParams[0] === 'function') {
        baseParams = baseParams[0];
      } else {
        baseParams = function() {
          return baseParams;
        };
      }
      if (typeof this["class"].prototype.baseParams === 'function') {
        (function(superBase, subBase) {
          return baseParams = function() {
            while (typeof superBase === 'function') {
              superBase = superBase.apply(this);
            }
            return superBase.concat(subBase.apply(this));
          };
        })(this["class"].prototype.baseParams, baseParams);
      }
      return this["class"].prototype.baseParams = baseParams;
    };

    Builder.prototype.get = function() {
      var arg, args, _i, _len, _results;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        _results.push(this["class"].prototype[arg] = function(data) {
          return this.get(arg, data);
        });
      }
      return _results;
    };

    Builder.prototype.post = function() {
      var arg, args, _i, _len, _results;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        _results.push(this["class"].prototype[arg] = function(data) {
          return this.post(arg, data);
        });
      }
      return _results;
    };

    return Builder;

  })();

  module.exports = Builder;

}).call(this);

},{}],4:[function(require,module,exports){
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

},{}]},{},[1])
;