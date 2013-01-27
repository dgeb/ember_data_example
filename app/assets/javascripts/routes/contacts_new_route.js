App.ContactsNewRoute = Ember.Route.extend({
  model: function() {
    // Because we are maintaining a transaction locally in the controller for editing,
    // the new record needs to be created in the controller.
    return null;
  },

  setupController: function(controller) {
    controller.startEditing();
  },

  exit: function() {
    this._super();
    this.controllerFor('contacts.new').stopEditing();
  }
});
