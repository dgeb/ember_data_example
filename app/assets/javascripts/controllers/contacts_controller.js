App.ContactsController = Em.ArrayController.extend({
  content: null,
  sortProperties: ['lastName', 'firstName'],
  activeContactID: null,
  contactChanged: function() {
    var activeContactID = this.get('activeContactID'),
        contacts = this.get('content');
    
    contacts.setEach('isActive', false);
    
    if(activeContactID)
      contacts.findProperty('id', activeContactID).set('isActive', true);

    this.set('content', contacts);
  }.observes('activeContactID')
});

