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
      url: @url.apply(@, @baseParams().concat(urlArgs))
      data: data

    xhr = $.ajax(ajaxOptions)

    @beforeSend(xhr)

    xhr

  post: (urlArgs...) ->

    @perform.apply(@, ['post'].concat(urlArgs))

  get: (urlArgs...) ->

    @perform.apply(@, ['get'].concat(urlArgs))

  beforeSend: (xhr) -> # Implement in subclasses.

  Builder: require('./builder')

Base.endpoints = (cb) ->

  builder = new @::Builder(class: @)
  cb.apply(builder)

module.exports = Base
