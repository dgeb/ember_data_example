App.ListContactsView = Em.View.extend({
  templateName: 'app/templates/contacts/list',
  contactsBinding: 'App.contactsController.allContacts',

  newView: Em.View.extend({
    tagName: 'span',

    click: function(evt) {
      evt.preventDefault();

      // show new contact form
      this.get("parentView").set('showNew', true);

      // prevent event from bubbling up
      return false;
    }
  }),

  refreshView: Em.View.extend({
    tagName: 'span',

    click: function(evt) {
      evt.preventDefault();

      App.contactsController.findAll();

      // prevent event from bubbling up
      return false;
    }
  })
});