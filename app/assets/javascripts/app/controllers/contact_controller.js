App.ContactController = Em.Controller.extend({
  destroyRecord: function() {
    this.get('content').deleteRecord();
    App.store.commit();
    App.router.transitionTo('contacts.index');
  }
});
