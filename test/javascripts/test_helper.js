//= require konacha_config
//= require sinon
//= require application
//= require chai-jquery

// Prevent the router from manipulating the browser's URL.
App.Router.reopen({location: 'none'});

//**** Utility methods (for tests only - not for use in apps) ***

var lookupStore = function() {
  return App.__container__.lookup('store:main');
}

var lookupRouter = function() {
  return App.__container__.lookup('router:main');
}

var appendView = function(view) {
  Ember.run(function() {
    view.append('#konacha');
  });
};

//**** Global before / after ***

// Sinon fake server
var server;

// Stub out Konacha.reset()
Konacha.reset = Ember.K;

beforeEach(function(done) {
  // Fake XHR
  server = sinon.fakeServer.create();

  // Prevent automatic scheduling of runloops. For tests, we
  // want to have complete control of runloops.
  Ember.testing = true;
  // Reset App
  Ember.run(function() {
    App.reset();
    done()
  });
});

afterEach(function() {
  // Restore XHR
  server.restore();
});
