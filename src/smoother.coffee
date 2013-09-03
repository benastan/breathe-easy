Client = require('./breathe-easy/client')
Base = require('./breathe-easy/base')

class Base extends Base

  @extend = (endpoints) ->

    class klass extends @

      @endpoints(endpoints)

  @member = (endpoints) ->

    @::Instance = @extend(endpoints)

class Client extends Client

  @new = (endpoint, setup) ->

    client = new Client()

    client.endpoint = endpoint

    client.setup = setup if typeof setup is 'function'

    client

  register: (endpointName, endpoints) ->

    klass = Base.extend(endpoints)

    klass::client = this

    @[endpointName] = new klass

    klass

if typeof window isnt 'undefined'

  window.Smoother = Client

module.exports = Client
