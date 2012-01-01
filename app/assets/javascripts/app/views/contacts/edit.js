App.EditContactView = Em.View.extend({
  templateName: 'app/templates/contacts/edit',
  tagName: 'form',

  submit: function(evt) {
    evt.preventDefault();

    var data = {
      first_name: this.$().find("#first_name").val(),
      last_name: this.$().find("#last_name").val()
    };
    var valid = App.Contact.validateProperties(data);

    if (valid === true) {
      var contact = this.get("contact");
      contact.setProperties(data);
      App.store.commit();

      // hide form
      this.get("parentView").stopEditing();
    }
    else {
      alert(valid);
    }

    // prevent event from bubbling up
    return false;
  }
});