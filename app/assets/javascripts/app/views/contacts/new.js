App.NewContactView = Ember.Form.extend({
  templateName: 'app/templates/contacts/edit',

  init: function() {
    // TODO: ugh
    this.set("contact", App.Contact.create({first_name: '', last_name: ''}));
    this._super();
  },

  afterRender: function() {
    // TODO: Is this the right place to set focus? Without setTimeout, Chrome gets locked up
    setTimeout(function() {this.$('input:first').focus();});
  },

  cancelForm: function() {
    this.get("parentView").hideNew();
  },

  submitForm: function() {
    var contact = this.get("contact");
    var validationErrors = contact.validate();

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    } else {
      // TODO: ugh
      App.store.createRecord(App.Contact,
                             {first_name: contact.get('first_name'),
                              last_name:  contact.get('last_name')});

      // TODO: not sure how to deal with commit errors
      App.store.commit();

      this.get("parentView").hideNew();
    }
  }
});
