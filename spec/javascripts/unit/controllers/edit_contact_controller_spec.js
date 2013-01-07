//= require spec_helper
//= require controllers/edit_contact_controller

describe("App.EditContactController", function() {
  it("is an Ember.ObjectController", function() {
    assert.ok(App.EditContactController);
    assert.ok(Ember.ObjectController.detect(App.EditContactController));
  });
});