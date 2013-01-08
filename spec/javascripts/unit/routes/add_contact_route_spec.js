//= require spec_helper
//= require routes/new_contact_route

describe("App.NewContactRoute", function() {
  it("is an Ember.Route", function() {
    assert.ok(App.NewContactRoute);
    assert.ok(Ember.Route.detect(App.NewContactRoute));
  });
});