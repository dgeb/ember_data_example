App.EditContactView = Em.Form.extend({
  templateName: 'app/templates/contacts/edit',

  submitForm: function() {
    var self = this;

    var contact = this.get("contact");

    var data = this.serialize();

    var validationErrors = contact.validate(data);

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    }
    else {
      contact.setProperties(data);

      // not sure how to deal with commit errors
      App.store.commit();

      // hide form
      self.get("parentView").stopEditing();
    }
  }
});