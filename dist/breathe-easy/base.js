(function() {
  var Base,
    __slice = [].slice;

  Base = (function() {
    function Base(attrs) {
      attrs || (attrs = {});
      this.client = attrs.client || this.client;
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
        url: this.url.apply(this, urlArgs),
        data: this.processData(data)
      };
      ajaxOptions = this.alterXHROptions(ajaxOptions);
      xhr = $.ajax(ajaxOptions);
      return xhr;
    };

    Base.prototype.processData = function(data) {
      return data;
    };

    Base.prototype.urlBase = function() {
      var base, param, params, urlArgs, _i, _len;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      params = this.baseParams;
      if (urlArgs.length) {
        params = params.concat(urlArgs);
      }
      base = [];
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        base.push(typeof param === 'function' ? param.apply(this) : param);
      }
      return base;
    };

    Base.prototype.url = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return [this.client.endpoint].concat(this.urlBase.apply(this, args)).join('/');
    };

    Base.prototype.post = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['post'].concat(urlArgs));
    };

    Base.prototype.put = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['put'].concat(urlArgs));
    };

    Base.prototype.get = function() {
      var urlArgs;
      urlArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.perform.apply(this, ['get'].concat(urlArgs));
    };

    Base.prototype.alterXHROptions = function(options) {
      return options;
    };

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
