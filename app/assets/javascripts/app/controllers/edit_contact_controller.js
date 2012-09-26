App.EditContactController = Em.ObjectController.extend({

  enterEditing: function() {
    this.transaction = this.get('store').transaction();
    if (this.get('id')) {
      this.transaction.add(this.get('content'));
      var phoneNumbers = this.get('phoneNumbers');
      if (phoneNumbers.get('isLoaded')) {
        this._addPhoneNumbersToTransaction();
      }else{
        phoneNumbers.addObserver('isLoaded', this, function(){
          this._addPhoneNumbersToTransaction();
        })
      }
    } else {
      this.set('content', this.transaction.createRecord(App.Contact, {}));
    }
  },

  addNumber: function(){
    var 
      self = this,
      phoneNumber = this.get('phoneNumbers').createRecord({number:0}, this.transaction);
    
    phoneNumber.one('didCreate', function(phoneNumber){
      Ember.run.next(function(){
        var transaction=self.get('store').transaction();
        transaction.add(phoneNumber);
        phoneNumber.set('contact', self);
        transaction.commit();
      });
        
    });
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
    App.router.transitionTo('contacts.contact.index', this.get('content'));
  },

  _addPhoneNumbersToTransaction: function() {
    var self = this;
    this.get('phoneNumbers').forEach(function (phoneNumber) {
      self.transaction.add(phoneNumber);
    });
  }
});
