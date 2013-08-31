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
