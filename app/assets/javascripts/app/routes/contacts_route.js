App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.Contact.find();
  }
});
