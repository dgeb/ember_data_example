App.ContactController = Em.Controller.extend({
  destroyRecord: function() {
    this.get('content').deleteRecord();
    this.get('store').commit();
    App.router.transitionTo('contacts.index');
  }
});
