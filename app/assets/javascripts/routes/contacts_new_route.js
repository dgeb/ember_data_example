App.ContactsNewRoute = Ember.Route.extend({
  model: function() {
    // Because we are maintaining a transaction locally in the controller for editing,
    // the new record needs to be created in the controller.
    return null;
  },

  setupController: function(controller) {
    this._super.apply(this, arguments);
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('contacts.new').stopEditing();
  }
});
