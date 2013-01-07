//= require spec_helper
//= require routes/add_contact_route

describe("App.AddContactRoute", function() {
  it("is an Ember.Route", function() {
    assert.ok(App.AddContactRoute);
    assert.ok(Ember.Route.detect(App.AddContactRoute));
  });
});