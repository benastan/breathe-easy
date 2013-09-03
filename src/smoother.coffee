Client = require('./breathe-easy/client')
Base = require('./breathe-easy/base')

class Base extends Base

  @extend = (endpoints) ->

    class klass extends @

      @endpoints(endpoints)

class Client extends Client

  @new = (endpoint, setup) ->

    client = new Client()

    client.endpoint = endpoint

    client.setup = setup

    client

  addEndpoint: (endpoints) ->

    klass = Base.extend(endpoints)

    klass::client = this

    klass

if typeof window isnt 'undefined'

  window.Smoother = Client

module.exports = Client
