App.AddContactRoute = Ember.Route.extend({
  init: function() {
    this._super();

    // reuse the EditContactController for adding contacts
    this.container.register('controller', 'addContact', App.EditContactController);
  },

  setupController: function(controller) {
    var newRecord = controller.get('store').createRecord(App.Contact, {});
    this.controllerFor('contacts').set('activeContactID', null);
    newRecord.set('isActive', true);
    controller.set('content', newRecord);
  },

  renderTemplate: function() {
    this.render('editContact');
  }
});
