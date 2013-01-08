App.NewContactRoute = Ember.Route.extend({
  init: function() {
    this._super();

    // reuse the EditContactController for new contacts
    this.container.register('controller', 'newContact', App.EditContactController);
  },

  setupController: function(controller) {
    // create a new record on a local transaction
    this.transaction = controller.get('store').transaction();
    var model = this.transaction.createRecord(App.Contact, {});

    controller.set('content', model);
  },

  exit: function() {
    this._super();

    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  renderTemplate: function() {
    // reuse the editContact template for new contacts
    this.render('editContact');
  },

  events: {
    cancel: function() {
      this.transitionTo('contactsIndex');
    },

    save: function(contact) {
      // when creating new records, it's necessary to wait for the record to be assigned
      // an id before we can transition to its route (which depends on its id)
      contact.addObserver('id', this, function() {
        this.transitionTo('contact', contact);
      });

      // commit and then clear the local transaction
      this.transaction.commit();
      this.transaction = null;
    }
  }
});
