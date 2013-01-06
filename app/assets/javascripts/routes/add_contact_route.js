App.AddContactRoute = Ember.Route.extend({
  renderTemplates: function() {
    this.render('editContact', { controller: this.controllerFor('editContact') });
  },
  setupControllers: function(controller) {
    var controller = this.controllerFor('editContact'),
        newRecord = controller.get('store').createRecord(App.Contact, {});
    this.controllerFor('contacts').set('activeContactID', null);
    newRecord.set('isActive', true);
    controller.set('content', newRecord);
  }
});
