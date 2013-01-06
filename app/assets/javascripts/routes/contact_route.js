App.ContactRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controllerFor('contacts').set('activeContactID', model.id);
    controller.set('content', App.Contact.find(model.id));
  }
});
