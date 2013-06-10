App.ContactsNewController = Em.ObjectController.extend({
  startEditing: function() {
    // create a new record on a local transaction
    this.transaction = this.get('store').transaction();
    this.set('model', this.transaction.createRecord(App.Contact, {}));
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  save: function() {
    // commit and then clear the local transaction
    this.transaction.commit();
    this.transaction = null;
  },

  transitionAfterSave: function() {
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    if (this.get('model.id')) {
      this.transitionToRoute('contact', this.get('model'));
    }
  }.observes('model.id'),

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('contacts.index');
  },

  addPhoneNumber: function() {
    this.get('model.phoneNumbers').createRecord();
  },

  removePhoneNumber: function(phoneNumber) {
    phoneNumber.deleteRecord();
  }
});
