App.EditContactView = Ember.View.extend({
  tagName: 'form',
  templateName: 'app/templates/contacts/edit',

  didInsertElement: function() {
    this.transaction = App.store.transaction();
    this.transaction.add(this.get("contact"));

    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    this.transaction.rollback();
    this.get("parentView").hideEdit();
  },

  submit: function(event) {
    var contact = this.get("contact");
    var validationErrors = contact.validate();

    event.preventDefault();

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    } else {
      this.transaction.commit(); // TODO: error handling

      // hide form
      this.get("parentView").hideEdit();
    }
  }
});