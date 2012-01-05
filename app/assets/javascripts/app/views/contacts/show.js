App.ShowContactView = Em.View.extend({
  templateName: 'app/templates/contacts/show',
  classNames: ['show-contact'],
  tagName: 'tr',

  doubleClick: function(evt) {
    this.startEditing();
    return false;
  },

  startEditing: function() {
    this.set('isEditing', true);
  },

  stopEditing: function() {
    this.set('isEditing', false);
  },

  destroyRecord: function() {
    var contact = this.get("contact");
    contact.deleteModel();

    // not sure how to deal with commit errors
    App.store.commit();
  }
});