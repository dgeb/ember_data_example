App.ContactsController = Em.ArrayController.extend({
  sortProperties: ['lastName', 'firstName'],

  init: function() {
    this.set('content', App.store.findAll(App.Contact));
  }
});
