App.Router = Ember.Router.extend({
  location: 'history',
  enableLogging: true
});

App.Router.map(function(match) {
  match('/').to('index');
  match('/contacts').to('contacts', function(match) {
    match('/').to('contactsIndex');
    match('/new').to('addContact');
    match('/:contact_id').to('contact');
    match('/:contact_id/edit').to('editContact');
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('contactsIndex');
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.Contact.find();
  }
});

App.ContactRoute = Ember.Route.extend({
  setupControllers: function(controller, param) {
    this.controllerFor('contacts').set('activeContactID', param.id);
    controller.set('content', App.Contact.find(param.id));
  }
});

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
