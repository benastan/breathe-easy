(function() {
  var Builder,
    __slice = [].slice;

  Builder = (function() {
    Builder.prototype.base = function() {
      var baseParams, param, params;
      baseParams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      params = [];
      if (typeof baseParams[0] !== 'function' && typeof baseParams[0] !== 'string') {
        baseParams = baseParams[0];
      }
      while (param = baseParams.shift()) {
        if (typeof param !== 'function') {
          param = (function(_param) {
            return _param;
          })(param);
        }
        params.push(param);
      }
      if (typeof this["class"].prototype.baseParams !== 'undefined') {
        return this["class"].prototype.baseParams = this["class"].prototype.baseParams.concat(params);
      } else {
        return this["class"].prototype.baseParams = params;
      }
    };

    function Builder(_arg) {
      this["class"] = _arg["class"];
    }

    Builder.prototype.data = function(cb) {
      return this["class"].prototype.processData = function(data) {
        return cb.apply(this, [data]);
      };
    };

    Builder.prototype.define = function() {
      var arg, args, type, _i, _len, _results,
        _this = this;
      type = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        _results.push((function(_arg) {
          var camelize, fn, otherFn;
          fn = function(data) {
            return this[type](_arg, data);
          };
          fn.type = type;
          camelize = function(type, arg) {
            return "" + type + (arg[0].toUpperCase()) + (arg.substr(1));
          };
          switch (typeof _this["class"].prototype[_arg]) {
            case 'function':
              otherFn = _this["class"].prototype[_arg];
              _this["class"].prototype[camelize(otherFn.type, _arg)] = otherFn;
              return _this["class"].prototype[camelize(type, _arg)] = fn;
            case 'object':
              return _this["class"].prototype[camelize(type, _arg)] = fn;
            default:
              return _this["class"].prototype[_arg] = fn;
          }
        })(arg));
      }
      return _results;
    };

    Builder.prototype["delete"] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('delete');
      return this.define.apply(this, args);
    };

    Builder.prototype.get = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('get');
      return this.define.apply(this, args);
    };

    Builder.prototype.member = function(endpoints) {
      return this["class"].prototype.Instance = this["class"].extend(endpoints);
    };

    Builder.prototype.setup = function(setup) {
      return this["class"].prototype.setup = setup;
    };

    Builder.prototype.patch = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('patch');
      return this.define.apply(this, args);
    };

    Builder.prototype.post = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('post');
      return this.define.apply(this, args);
    };

    Builder.prototype.proto = function(proto) {
      return proto.apply(this["class"].prototype);
    };

    Builder.prototype.put = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.unshift('put');
      return this.define.apply(this, args);
    };

    return Builder;

  })();

  module.exports = Builder;

}).call(this);
