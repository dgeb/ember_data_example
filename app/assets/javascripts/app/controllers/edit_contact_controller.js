App.EditContactController = Em.Controller.extend({
  content: null,

  enterEditing: function() {
    this.transaction = App.store.transaction();
    if (this.get('content.id')) {
      this.transaction.add(this.get('content'));
    } else {
      this.set('content', this.transaction.createRecord(App.Contact, {}));
    }
  },

  exitEditing: function() {
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  updateRecord: function() {
    // commit and then clear the transaction (so cancelEditing doesn't attempt a rollback)
    this.transaction.commit();
    this.transaction = null;

    // transition to the updated contact
    App.router.transitionTo('contacts.contact.index', this.get('content'));
  }
});
