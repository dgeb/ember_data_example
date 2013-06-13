//= require konacha_config
//= require sinon
//= require application
//= require test_utils

// Sinon fake server
var server;

// Stub out Konacha.reset()
Konacha.reset = Ember.K;

// Prevent automatic scheduling of runloops. For tests, we
// want to have complete control of runloops.
Ember.testing = true;

// Defer App readiness (it will be advanced in each test below)
App.deferReadiness();

// Prevent the router from manipulating the browser's URL.
App.Router.reopen({location: 'none'});

beforeEach(function(done) {
  // Fake XHR
  server = sinon.fakeServer.create();

  Ember.run(function() {
    // Advance App readiness, which was deferred above.
    App.advanceReadiness();

    // Setup is complete when the App readiness promise resolves
    App.then(function() {
      done();
    });
  });
});

afterEach(function() {
  // Reset App state
  App.reset();

  // Restore XHR
  server.restore();
});
