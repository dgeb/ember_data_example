//= require test_helper
//= require controllers/contact_edit_controller

describe("App.ContactEditController", function() {
  it("is an Ember.ObjectController", function() {
    assert.ok(App.ContactEditController);
    assert.ok(Ember.ObjectController.detect(App.ContactEditController));
  });
});