App.EditContactRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);

    // notify the controller that editing has begun
    controller.enterEditing();

    // highlight this contact as active
    this.controllerFor('contacts').set('activeContactId', model.get('id'));
  },

  exit: function() {
    this._super();

    // notify the controller that editing has finished
    this.controllerFor(this.templateName).exitEditing();

    // no contact is active (momentarily, at least)
    this.controllerFor('contacts').set('activeContactId', null);
  }
});
