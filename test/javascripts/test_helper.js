//= require konacha_config
//= require sinon
//= require application

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

// Defer App readiness until we're in an Ember runloop
App.deferReadiness();

beforeEach(function(done) {
  // Fake XHR
  server = sinon.fakeServer.create();

  // Initialize App (if necessary)
  if (App.isInitialized) {
    done();
  } else {
    // Prevent automatic scheduling of runloops. For tests, we
    // want to have complete control of runloops.
    Ember.testing = true;

    Ember.run(function() {
      // Advance App readiness
      App.advanceReadiness();

      // When App readiness promise resolves, setup is complete
      App.then(function(){
        done();
      });
    });
  }
});

afterEach(function() {
  // Reset App
  Ember.run(function() {
    App.reset();
  });

  // Restore XHR
  server.restore();
});
