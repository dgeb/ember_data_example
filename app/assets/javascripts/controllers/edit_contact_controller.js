App.EditContactController = Em.ObjectController.extend({
  content: null,
  
  enterEditing: function() {
    // create a local transaction
    this.transaction = this.get('store').transaction();
    if (this.get('content.id')) {
      // when editing records, add them to the local transaction
      this.transaction.add(this.get('content'));
    } else {
      // create new records on the local transaction
      this.set('content', this.transaction.createRecord(App.Contact, {}));
    }
  },

  exitEditing: function() {
    // rollback the local transaction (if it hasn't been cleared already)
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
    this.get('target.router').transitionTo('contact', content);
  }
});
