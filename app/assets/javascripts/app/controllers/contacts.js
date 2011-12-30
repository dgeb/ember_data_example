App.contactsController = Em.ArrayController.create({
  loadAll: function(data) {
    this.set('content', App.store.loadAll(App.Contact, data));
  },

  findAll: function() {
    this.set('content', App.store.findAll(App.Contact));
  }
});
