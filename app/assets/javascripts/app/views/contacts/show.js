App.ShowContactView = Em.View.extend({
  templateName: 'app/templates/contacts/show',
  classNames: ['show-contact'],
  tagName: 'tr',

  doubleClick: function(evt) {
    this.startEditing();
    return false;
  },

  showEdit: function() {
    this.set('isEditing', true);
  },

  hideEdit: function() {
    this.set('isEditing', false);
  },

  destroyRecord: function() {
    var contact = this.get("contact");
    contact.deleteRecord();

    // TODO: not sure how to deal with commit errors
    App.store.commit();
  }
});