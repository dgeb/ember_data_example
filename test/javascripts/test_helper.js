//= require konacha_config
//= require sinon
//= require application

//**** Config Ember for testing ***

// Prevent automatic scheduling of runloops. For tests, we
// want to have complete control of runloops.
Ember.testing = true;

// Workaround needed to prevent `App.initialize()` from being
// scheduled. TODO: review `scheduleInitialize` in Ember itself.
App.isInitialized = true;

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
  // Fake XHR
  server = sinon.fakeServer.create();

  Ember.run(function() {
    App.reset();
  });
});

afterEach(function() {
  // Restore XHR
  server.restore();
});
