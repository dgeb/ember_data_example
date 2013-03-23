//= require konacha_config
//= require sinon
//= require application

//**** Config Ember for testing ***

// Prevent automatic scheduling of runloops. For tests, we
// want to have complete control of runloops.
// TODO - Ember.testing = true;

// Prevent the router from manipulating the browser's URL.
App.Router.reopen({location: 'none'});

// Ensure that the app is rendered in Konacha's test div
App.reopen({rootElement: '#konacha'});

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

var server;

beforeEach(function() {
  Ember.run(function() {
    // Fake XHR
    server = sinon.fakeServer.create();

    App.reset();
  });

  // Begin a runloop for each test
  // (note: individual tests may require further runloops)
  Ember.run.begin();
});

afterEach(function() {
  // End each test's runloop
  Ember.run.end();

  // Restore XHR
  server.restore();
});
