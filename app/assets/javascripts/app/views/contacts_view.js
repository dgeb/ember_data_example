App.ContactsView = Em.View.extend({
  templateName: 'app/templates/contacts/list',

  showNew: function() {
    this.set('isNewVisible', true);
  },

  hideNew: function() {
    this.set('isNewVisible', false);
  }
});