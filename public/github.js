(function() {
  function __extend() {
    var args = [].slice.apply(arguments),
        mixin = args.shift(),
        klass = function() {
          mixin.apply(this, arguments);
          this['arguments'] = arguments;
          if (this.setup) this.setup.apply(this, arguments);
        },
        i;
    klass.constructor = klass;
    for (i in mixin.prototype) klass.prototype[i] = mixin.prototype[i];
    for (i in mixin) klass[i] = mixin[i];
    return klass;
  }

  var Github = {},
      User,
      Gist,
      endpoint = 'https://api.github.com',
      Client = __extend(BreatheEasy.Client);

  Client.prototype.setup = function(options) {
    this.basicAuthentication = options.basicAuthentication;
    this.User = new Github.User({ client: this });
    this.Gist = new Github.Gist({ client: this });
  };

  BreatheEasy.Base.prototype.alterXHROptions = function(options) {
    var base = this;
    options.beforeSend = function(xhr) {
      xhr.setRequestHeader('Authorization', base.client.basicAuthentication);
    };
    return options;
  };

  Client.prototype.endpoint = endpoint;

  Github.User = User = __extend(BreatheEasy.Base);

  User.endpoints(function() { this.base('users'); });

  UserInstance = __extend(User);

  UserInstance.prototype.setup = function(attrs) {
    this.username = attrs.username;
  };

  UserInstance.endpoints(function() {
    this.base(function() { return this.username; });
    this.get('gists');
  });

  User.prototype.Instance = UserInstance;

  Github.Gist = Gist = __extend(BreatheEasy.Base);

  Gist.endpoints(function() {
    this.base('gists');
    this.get('public');
  });

  GistInstance = __extend(Gist);

  GistInstance.prototype.setup = function(options) {
    this.gistId = options.gistId;
  };

  GistInstance.endpoints(function() {
    this.base(function() { return this.gistId; });
    this.put('star');
    this.get('star');
  });

  Gist.prototype.Instance = GistInstance;

  window.Client = Client;
})();
