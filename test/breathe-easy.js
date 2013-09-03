function __extend(mixin, args) {
  var klass = function() {
      mixin.apply(this, arguments);
      this['arguments'] = arguments;
      if (this.setup) this.setup();
  };
  klass.prototype = new mixin(args);
  klass.constructor = klass;
  for (var i in mixin) klass[i] = mixin[i];
  return klass;
}

describe(BreatheEasy, function() {
  var Client = BreatheEasy.Client,
      Base = BreatheEasy.Base,
      client,
      endpoint = 'https://api.github.com';
  Client.prototype.endpoint = endpoint;
  client = new Client();

  beforeEach(function() {
    Base.prototype.alterXHROptions = function(options) {
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('Authorization', 'Basic <%= GITHUB_BASIC_AUTH %>');
      };
      return options;
    };
  });

  describe('Initializing the client', function() {
    it('instantiates the client', function() {
      client.endpoint.should.equal(endpoint);
    });
  });

  describe('Gist', function(){
    var Gist, undefined, gist, gists, User, user, Instance;
    beforeEach(function() {
      Gist = __extend(Base, { client: client });
      Gist.endpoints(function() {
        this.base('gists');
        this.get('public');
      });
      gists = new Gist({ client: client });
    });
    afterEach(function() { Gist = undefined; });
    describe('unnested Base', function() {
      describe('#endpoints', function() {
        it('constructs url from endpoint and baseParams', function() {
          gists.url().should.equal([ endpoint, 'gists' ].join('/'));
        });
        it('has explore public', function(done) {
          gists['public']().done(function(rsp) {
            rsp.length.should.be.above(0);
            done();
          });
        });
      });
    });
    describe('nested', function() {
      var Instance, instance;
      beforeEach(function() {
        Instance = __extend(Gist, { client: client });
        Instance.prototype.setup = function() {
          this.gistId = this['arguments'][0].gistId;
        };
        Instance.endpoints(function() {
          this.base(function() {
            return this.gistId;
          });
          this.put('star');
          this.get('star');
        });
        Gist.prototype.Instance = Instance;
        gist = gists['new']({ gistId: 6415656 });
      });
      it('constructs url from endpoint, parent baseParams, and own baseParams', function() {
        gist.url().should.equal([ endpoint, 'gists', 6415656 ].join('/'));
      });
      it('can get star', function(done) {
        gist.putStar().done(function(rsp, status, xhr) {
          xhr.status.should.equal(204);
          done();
        });
      });
    });
  });
  describe('another unnested Base', function() {
    beforeEach(function() {
      User = __extend(Base, { client: client });
      User.endpoints(function() {
        this.base('users');
      });
      Instance = __extend(User, { client: client });
      Instance.prototype.setup = function() {
        this.username = this['arguments'][0].username;
      };
      Instance.endpoints(function() {
        this.base(function() { return this.username; });
        this.get('gists');
      });
      User.prototype.Instance = Instance;
      users = new User({ client: client });
      user = users['new']({ username: 'benastan' });
    });
    afterEach(function() {
      User = undefined;
    });
    it('can get the user\'s gists', function(done) {
      user.gists().done(function(rsp) {
        rsp.slice(-3, -2)[0].id.should.equal('6394887');
        done();
      });
    });
  });
});
