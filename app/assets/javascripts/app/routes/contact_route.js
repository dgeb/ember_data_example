App.ContactRoute = Ember.Route.extend({
  setupControllers: function(controller, param) {
    this.controllerFor('contacts').set('activeContactID', param.id);
    controller.set('content', App.Contact.find(param.id));
  }
});
