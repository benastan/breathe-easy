class Builder

  base: (baseParams...) ->

    params = []

    if typeof baseParams[0] isnt 'function' && typeof baseParams[0] isnt 'string'

      baseParams = baseParams[0]

    while param = baseParams.shift()

      if typeof param isnt 'function'

        param = ((_param) -> _param)(param)

      params.push(param)

    if typeof @class::baseParams isnt 'undefined'

      @class::baseParams = @class::baseParams.concat(params)

    else

      @class::baseParams = params

  constructor: ({@class}) ->

  data: (cb) ->

    @class::processData = (data) ->

      cb.apply(@, [data])

  define: (type, args...) ->

    for arg in args

      ((_arg) =>

        fn = (data) -> @[type](_arg, data)
        fn.type = type

        camelize = (type, arg) ->

          "#{type}#{arg[0].toUpperCase()}#{arg.substr(1)}"

        switch typeof @class::[_arg]

          when 'function'

            otherFn = @class::[_arg]

            @class::[camelize(otherFn.type, _arg)] = otherFn
            @class::[camelize(type, _arg)] = fn

          when 'object'

            @class::[camelize(type, _arg)] = fn

          else

            @class::[_arg] = fn
      )(arg)

  delete: (args...) ->

    args.unshift('delete')
    @define.apply(@, args)

  get: (args...) ->

    args.unshift('get')
    @define.apply(@, args)

  member: (endpoints) ->

    @class::Instance = @class.extend(endpoints)

  setup: (setup) ->

    @class::setup = setup

  patch: (args...) ->

    args.unshift('patch')
    @define.apply(@, args)

  post: (args...) ->

    args.unshift('post')
    @define.apply(@, args)

  proto: (proto) ->

    proto.apply(@class::)

  put: (args...) ->

    args.unshift('put')
    @define.apply(@, args)

module.exports = Builder
