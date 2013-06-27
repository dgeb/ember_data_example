//= require konacha_config
//= require sinon
//= require application
//= require test_utils
//= require adapter

// Sinon fake server
var server;

sinon.config = {
  useFakeTimers: false
}

// Stub out Konacha.reset()
Konacha.reset = Ember.K;

Ember.Test.adapter = Ember.Test.MochaAdapter.create();
App.setupForTesting();
App.injectTestHelpers();

beforeEach(function(done) {
  // Fake XHR
  server = sinon.fakeServer.create();
  server.autoRespond = true;
  Ember.run(function() {
  // Advance App readiness, which was deferred above.
    server.respondWith(
      "GET",
      "/contacts",
      [200, { "Content-Type": "application/json" }, JSON.stringify({contacts: []})]
    );
    App.advanceReadiness();

    // Setup is complete when the App readiness promise resolves
    App.then(function() {
      done();
    });
  });
});

afterEach(function() {
  server.respondWith(
      "GET",
      "/contacts",
      [200, { "Content-Type": "application/json" }, JSON.stringify({contacts: []})]
    );
  App.reset();
  
  // Restore XHR
  server.restore();
  
});
