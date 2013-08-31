class Builder

  constructor: ({@class}) ->

  base: (baseParams...) ->

    if typeof baseParams[0] is 'function'

      baseParams = baseParams[0]

    else

      baseParams = -> baseParams

    if typeof @class::baseParams is 'function'

      ((superBase, subBase) ->

        baseParams = ->

          while typeof superBase is 'function'

            superBase = superBase.apply(@)

          superBase.concat(subBase.apply(@))

      )(@class::baseParams, baseParams)

    @class::baseParams = baseParams

  get: (args...) ->

    for arg in args

      @class::[arg] = (data) -> @get(arg, data)

  post: (args...) ->

    for arg in args

      @class::[arg] = (data) -> @post(arg, data)

module.exports = Builder
