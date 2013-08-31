class BreatheEasy

  @Client = require('./breathe-easy/client')

  @Base = require('./breathe-easy/base')

window.BreatheEasy = BreatheEasy if typeof window isnt 'undefined'

module.exports = BreatheEasy
