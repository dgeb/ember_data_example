App.ListContactsView = Em.View.extend({
  templateName: 'app/templates/contacts/list',
  contactsBinding: 'App.contactsController',

  showNew: function() {
    this.set('isNewVisible', true);
  },

  hideNew: function() {
    this.set('isNewVisible', false);
  },

  refreshListing: function() {
    App.contactsController.findAll();
  }
});