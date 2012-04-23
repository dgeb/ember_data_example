App.contactsController = Em.ArrayController.create({
  loadAll: function(data) {
    App.store.loadMany(App.Contact, data);
    this.findAll();
  },

  findAll: function() {
    this.set('content', App.store.findAll(App.Contact));
  }
});
