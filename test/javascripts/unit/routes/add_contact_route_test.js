//= require test_helper
//= require routes/contacts_new_route

describe("App.ContactsNewRoute", function() {
  it("is an Ember.Route", function() {
    assert.ok(App.ContactsNewRoute);
    assert.ok(Ember.Route.detect(App.ContactsNewRoute));
  });
});