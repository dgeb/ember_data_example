App.NewContactView = Ember.View.extend({
  tagName: 'form',
  templateName: 'app/templates/contacts/edit',

  init: function() {
    // TODO: ugh
    this.set("contact", App.Contact.create({first_name: '', last_name: ''}));
    this._super();
  },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    this.get("parentView").hideNew();
  },

  submit: function(event) {
    var contact = this.get("contact");
    var validationErrors = contact.validate();

    event.preventDefault();

    if (validationErrors !== undefined) {
      App.displayError(validationErrors);
    } else {
      // TODO: ugh - need better serialization
      App.store.createRecord(App.Contact,
                             {first_name: contact.get('first_name'),
                              last_name:  contact.get('last_name')});

      App.store.commit(); // TODO: error handling

      this.get("parentView").hideNew();
    }
  }
});
