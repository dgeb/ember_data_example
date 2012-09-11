App.ContactsController = Em.ArrayController.extend({
  init: function() {
    this.set('content', App.store.findAll(App.Contact));
  }
});
