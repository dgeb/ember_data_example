App.ContactRoute = Ember.Route.extend({
  exit: function() {
    this._super();
    this.controllerFor('contacts').set('activeContactId', null);
  },

  setupController: function(controller, model) {
    this.controllerFor('contacts').set('activeContactId', model.id);
    controller.set('content', App.Contact.find(model.id));
  }
});
