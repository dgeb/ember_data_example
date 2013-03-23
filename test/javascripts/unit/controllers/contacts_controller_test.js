//= require test_helper

describe("App.ContactsController", function() {
  var controller,
      store;

  beforeEach(function() {
    store = lookupStore();

    Ember.run(function() {
      store.loadMany(App.Contact, [
        {id: 1, first_name: 'Aaron',  last_name: 'Zeebob'},
        {id: 2, first_name: 'Aaaron', last_name: 'Zeebob'},
        {id: 3, first_name: 'Zeus',   last_name: 'Aaardvaaark'},
      ]);
    });

    controller = App.ContactsController.create();
    controller.set('content', store.findMany(App.Contact, [1, 2, 3]));
  });

  it("sorts by [lastName, firstName]", function() {
    assert.equal(controller.get('arrangedContent.length'), 3);
    assert.equal(controller.get('arrangedContent').objectAt(0).get('id'), '3');
    assert.equal(controller.get('arrangedContent').objectAt(1).get('id'), '2');
    assert.equal(controller.get('arrangedContent').objectAt(2).get('id'), '1');
  });
});
