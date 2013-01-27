App.ContactsNewController = Em.ObjectController.extend({
  startEditing: function() {
    // create a new record on a local transaction
    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.Contact, {}));
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  save: function() {
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    var contact = this.get('content');
    contact.addObserver('id', this, function() {
      this.transitionTo('contact', contact);
    });

    // commit and then clear the local transaction
    this.transaction.commit();
    this.transaction = null;
  },

  cancel: function() {
    this.stopEditing();
    this.transitionTo('contacts.index');
  },

  addPhoneNumber: function() {
    this.get('content.phoneNumbers').createRecord({}, this.transaction);
  },

  removePhoneNumber: function(phoneNumber) {
    this.get('content.phoneNumbers').removeObject(phoneNumber);
  }
});
