//= require konacha_config
//= require sinon
//= require application
//= require test_utils

// Prevent automatic scheduling of runloops. For tests, we
// want to have complete control of runloops.
Ember.testing = true;

// Prevent the router from manipulating the browser's URL.
App.Router.reopen({location: 'none'});

// Stub out Konacha.reset()
Konacha.reset = Ember.K;

// Sinon fake server
var server;

beforeEach(function(done) {
  // Fake XHR
  server = sinon.fakeServer.create();

  Ember.run(function() {
    // Advance App readiness, which was deferred when the app
    // was created. This needs to be done here, after each iframe has been
    // setup, instead of in a global `before`.
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
