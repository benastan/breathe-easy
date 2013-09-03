describe(BreatheEasy, function() {
  var basicAuthentication = 'Basic <%= GITHUB_BASIC_AUTH %>',
      client = new Client({ basicAuthentication: basicAuthentication }),
      endpoint = 'https://api.github.com';
  describe('Initializing the client', function() {
    it('instantiates the client', function() {
      client.endpoint.should.equal('https://api.github.com');
    });
  });

  describe('Gist', function(){
    var undefined, gist, user;
    describe('unnested Base', function() {
      describe('#endpoints', function() {
        it('constructs url from endpoint and baseParams', function() {
          client.Gist.url().should.equal('https://api.github.com/gists');
        });
        it('has explore public', function(done) {
          client.Gist['public']().done(function(rsp) {
            rsp.length.should.be.above(0);
            done();
          });
        });
      });
    });
    describe('nested', function() {
      beforeEach(function() {
        gist = client.Gist['new']({ gistId: 6415656 });
      });
      it('constructs url from endpoint, parent baseParams, and own baseParams', function() {
        gist.url().should.equal('https://api.github.com/gists/6415656');
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
    var user;
    beforeEach(function() {
      user = client.User['new']({ username: 'benastan' });
    });
    it('can get the user\'s gists', function(done) {
      user.gists().done(function(rsp) {
        rsp.slice(-3, -2)[0].id.should.equal('6394887');
        done();
      });
    });
  });
});
