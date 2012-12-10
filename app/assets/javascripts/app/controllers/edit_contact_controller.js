App.EditContactController = Em.Controller.extend({
  content: null,

  enterEditing: function() {
    this.transaction = this.get('store').transaction();
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
    // TODO - validations

    // commit and then clear the transaction (so exitEditing doesn't attempt a rollback)
    this.transaction.commit();
    this.transaction = null;

    if (this.get('content.isNew')) {
      // when creating new records, it's necessary to wait for the record to be assigned
      // an id before we can transition to its route (which depends on its id)
      this.get('content').addObserver('id', this, 'showRecord');
    } else {
      // when updating records, the id is already known, so we can transition immediately
      this.showRecord();
    }
  },

  showRecord: function() {
    var content = this.get('content');
    content.removeObserver('id', this, 'showRecord');
    App.router.transitionTo('contacts.contact.index', content);
  }
});
