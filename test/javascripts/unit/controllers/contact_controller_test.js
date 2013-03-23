//= require test_helper
//= require controllers/contact_controller

describe("App.ContactController", function() {
  it("is an Ember.ObjectController", function() {
    assert.ok(App.ContactController);
    assert.ok(Ember.ObjectController.detect(App.ContactController));
  });
});