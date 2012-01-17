App.EditContactView = Em.Form.extend({
  templateName: 'app/templates/contacts/edit',

  afterRender: function() {
    // TODO: Is this the right place to set focus? Without setTimeout, Chrome gets locked up
    setTimeout(function() {this.$('input:first').focus();});
  },

  cancelForm: function() {
    // TODO: This will not cancel edits to the contact, which we're editing directly.
    // Two possible approaches to fix this:
    // * edit a copy of the contact and apply changes in submitForm()
    // * save the original version of the object and then revert to it on cancel
    this.get("parentView").hideEdit();
  },

  submitForm: function() {
    var contact = this.get("contact");
    var validationErrors = contact.validate();

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    } else {
      App.store.commit(); // TODO: error handling

      // hide form
      this.get("parentView").hideEdit();
    }
  }
});