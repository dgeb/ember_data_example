App.ContactController = Em.ObjectController.extend({

  hasPhoneNumbers: function(){
    return this.get('phoneNumbers.length') > 0;
  }.property('phoneNumbers.@each'),

  destroyRecord: function() {
  	this.get('phoneNumbers').toArray().forEach(function (phoneNumber){
  		phoneNumber.deleteRecord();
  	});
    this.get('content').deleteRecord();
    this.get('store').commit();
    App.router.transitionTo('contacts.index');
  }
});
