App.ContactController = Em.ObjectController.extend({
  destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.get('content').deleteRecord();
      this.get('store').commit();
      this.get('target.router').transitionTo('contactsIndex');
    }
  }
});

