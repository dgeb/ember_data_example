App.ContactsRoute = Ember.Route.extend({
  model: function() {
    // request all contacts from adapter
    App.Contact.find();

    // filter contacts to exclude new ones
    return App.Contact.filter(function(contact) {
      return !contact.get('isNew');
    });
  }
});
