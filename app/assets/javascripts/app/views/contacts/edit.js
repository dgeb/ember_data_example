App.EditContactView = Ember.View.extend({
  tagName: 'form',
  templateName: 'app/templates/contacts/edit',

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    // TODO: This will not cancel edits to the contact, which we're editing directly.
    // Two possible approaches to fix this:
    // * edit a copy of the contact and apply changes in submitForm()
    // * save the original version of the object and then revert to it on cancel
    this.get("parentView").hideEdit();
  },

  submit: function(event) {
    var contact = this.get("contact");
    var validationErrors = contact.validate();

    event.preventDefault();

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    } else {
      App.store.commit(); // TODO: error handling

      // hide form
      this.get("parentView").hideEdit();
    }
  }
});