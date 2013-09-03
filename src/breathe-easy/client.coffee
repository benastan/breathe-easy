settings =

  usePromises: true

class Client

  constructor: (@arguments...) ->

    {@usePromises} = $.extend(true, settings, @arguments)

    @setup.apply(@, @arguments)

  setup: ->

  usePromises: (usePromises) ->

    if typeof usePromises is undefined

      settings.usePromises = true

    else

      settings.usePromises = usePromises

module.exports = Client
