App.NewContactView = Ember.Form.extend({
  templateName: 'app/templates/contacts/edit',

  init: function() {
    this.set("contact", App.Contact.create());
    this._super();
  },

  submitForm: function() {
    var self = this;

    var contact = this.get("contact");

    var data = this.serialize();

    var validationErrors = contact.validate(data);

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    }
    else {
      contact = App.store.create(App.Contact, data);

      // not sure how to deal with commit errors
      App.store.commit();

      // hide form
      this.get("parentView").set('showNew', false);
    }
  }
});
