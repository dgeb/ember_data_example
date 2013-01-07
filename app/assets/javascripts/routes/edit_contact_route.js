App.EditContactRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);

    // add the model to a local transaction
    this.transaction = controller.get('store').transaction();
    this.transaction.add(model);

    // highlight this contact as active
    this.controllerFor('contacts').set('activeContactId', model.get('id'));
  },

  exit: function() {
    this._super();

    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
    }

    // no contact is active (momentarily, at least)
    this.controllerFor('contacts').set('activeContactId', null);
  },

  events: {
    cancel: function(contact) {
      this.transitionTo('contact', contact);
    },

    save: function(contact) {
      this.transaction.commit();
      this.transaction = null;
      this.transitionTo('contact', contact);
    }
  }
});
