//= require spec_helper
//= require controllers/contacts_controller

describe("App.ContactsController", function() {
  it("is an Ember.ArrayController", function() {
    assert.ok(App.ContactsController);
    assert.ok(Ember.ArrayController.detect(App.ContactsController));
  });
  it("sorts by [lastName, firstName]", function() {
    var sortProperties = App.ContactsController.create().get('sortProperties');
    assert.equal(sortProperties[0], 'lastName');
    assert.equal(sortProperties[1], 'firstName');
  });
});
