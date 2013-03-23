//= require test_helper
//= require router

describe("App.Router", function() {
  it("is an Ember.Router", function() {
    assert.ok(App.Router);
    assert.ok(Ember.Router.detect(App.Router));
  });
});