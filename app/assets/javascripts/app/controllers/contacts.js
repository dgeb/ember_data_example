App.contactsController = Em.ArrayController.create({
  loadAll: function(data) {
    // TODO - figure out the proper way to load data into the store and then retrieve it as an Ember array
    // App.store.loadMany(App.Contact, data);

    // for now, let's just hit the server
    this.findAll();
  },

  findAll: function() {
    this.set('content', App.store.findAll(App.Contact));
  }
});
