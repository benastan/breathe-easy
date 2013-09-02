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
