class Base

  constructor: ({@client}) ->

    @attributes = {}

  new: (attributes) ->

    attributes ||= {}
    attributes.client = @client
    new @Instance(attributes)

  perform: (type, urlArgs..., data) ->

    unless @client.usePromises

      {type, data, urlArgs, success, error} = type

    if typeof data is 'string'

      urlArgs.push(data)
      data = undefined

    ajaxOptions =

      type: type
      url: @url.apply(@, urlArgs)
      data: @processData(data)

    ajaxOptions = @alterXHROptions(ajaxOptions)

    xhr = $.ajax(ajaxOptions)

    xhr

  processData: (data) -> data

  urlBase: (urlArgs...) ->

    params = @baseParams

    params = params.concat(urlArgs) if urlArgs.length

    base = []

    for param in params

      base.push(

        if typeof param is 'function'

          param.apply(@)

        else

          param

      )

    base

  url: (args...) ->

    [ @client.endpoint ].concat(@urlBase(args...)).join('/')

  post: (urlArgs...) ->

    @perform.apply(@, ['post'].concat(urlArgs))

  put: (urlArgs...) ->

    @perform.apply(@, ['put'].concat(urlArgs))

  get: (urlArgs...) ->

    @perform.apply(@, ['get'].concat(urlArgs))

  alterXHROptions: (options) -> options # Implement in subclasses.

  Builder: require('./builder')

Base.endpoints = (cb) ->

  builder = new @::Builder(class: @)
  cb.apply(builder)

module.exports = Base
