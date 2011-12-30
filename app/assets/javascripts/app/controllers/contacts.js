App.contactsController = Em.ArrayController.create({
  allContacts: [],

  loadAll: function(data) {
    this.set('allContacts', App.store.loadAll(App.Contact, data));
  },

  findAll: function() {
    this.set('allContacts', App.store.findAll(App.Contact));
  }
});
