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
