App.NewContactView = Ember.View.extend({
  tagName: 'form',
  templateName: 'app/templates/contacts/edit',

  init: function() {
    this._super();

    this.transaction = App.store.transaction();
    this.get("controller").set("contact", this.transaction.createRecord(App.Contact, {}));
  },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    this.transaction.rollback();
    this.get("parentView").hideNew();
  },

  submit: function(event) {
    var contact = this.get("controller").get("contact");
    var validationErrors = contact.validate();

    event.preventDefault();

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    } else {
      this.transaction.commit(); // TODO: error handling

      this.get("parentView").hideNew();
    }
  }
});
