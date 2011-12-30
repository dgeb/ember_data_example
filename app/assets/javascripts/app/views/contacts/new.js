App.NewContactView = Em.View.extend({
  templateName: 'app/templates/contacts/new',
  tagName: 'tr',

  submit: function(evt) {
    evt.preventDefault();

    var contact = App.store.create(App.Contact, {
      firstName: this.$().find("#firstName").val(),
      lastName: this.$().find("#lastName").val()
    });
    App.store.commit();

    // hide new contact form
    this.get("parentView").set('showNew', false);

    // prevent event from bubbling up
    return false;
  }
});