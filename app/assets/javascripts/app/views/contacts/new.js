App.NewContactView = Em.View.extend({
  templateName: 'app/templates/contacts/new',
  tagName: 'tr',

  submit: function(evt) {
    evt.preventDefault();

    var contact = App.store.create(App.Contact, {
      first_name: this.$().find("#first_name").val(),
      last_name: this.$().find("#last_name").val()
    });
    App.store.commit();

    // hide new contact form
    this.get("parentView").set('showNew', false);

    // prevent event from bubbling up
    return false;
  }
});