App.ListContactsView = Em.View.extend({
  templateName: 'app/templates/contacts/list',
  contactsBinding: 'App.contactsController',

  newRecord: function() {
    this.set('showNew', true);
  },

  refreshListing: function() {
    App.contactsController.findAll();
  }
});