App.ShowContactView = Em.View.extend({
  templateName: 'app/templates/contacts/show',
  classNames: ['show-contact'],
  tagName: 'tr',

  startEditing: function() {
    this.set('isEditing', true);
  },

  stopEditing: function() {
    this.set('isEditing', false);
  },

  doubleClick: function(evt) {
    this.startEditing();
    return false;
  },

  editLink: Em.View.extend({
    tagName: 'span',

    click: function(evt) {
      evt.preventDefault();

      this.get("parentView").startEditing();

      // prevent event from bubbling up
      return false;
    }
  }),

  destroyLink: Em.View.extend({
    tagName: 'span',

    click: function(evt) {
      evt.preventDefault();

      var contact = this.get("parentView").get("contact");
      contact.deleteModel();
      App.store.commit();

      // prevent event from bubbling up
      return false;
    }
  })
});