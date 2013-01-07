App.AddContactRoute = Ember.Route.extend({
  init: function() {
    this._super();

    // reuse the EditContactController for adding contacts
    this.container.register('controller', 'addContact', App.EditContactController);
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    // notify the controller that editing has begun
    controller.enterEditing();
  },

  exit: function() {
    this._super();

    // notify the controller that editing has finished
    this.controllerFor(this.templateName).exitEditing();
  },

  renderTemplate: function() {
    // reuse the editContact template for adding contacts
    this.render('editContact');
  }
});
