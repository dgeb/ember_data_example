App.ContactController = Em.ObjectController.extend({
  destroyRecord: function() {
    var that = this;
    Bootstrap.ModalPane.popup({
      heading: 'Delete Contact',
      message: "Yo sure, wanna delete that one?",
      primary: "Delete",
      secondary: "Cancel",
      callback: function(options) {
        if(options.primary) {
          that.get('content').deleteRecord();
          that.get('store').commit();
          that.get('target.router').transitionTo('contactsIndex');
        }
      }
    });
  }
//  destroyRecord: function() {
//    
//    this.get('store').commit();
//    App.router.transitionTo('contacts.index');
//  }
});

