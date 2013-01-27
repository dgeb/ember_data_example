App.ContactController = Em.ObjectController.extend({
  isEditing: false,

  startEditing: function() {
    var contactEditController = this.controllerFor('contactEdit');
    contactEditController.set('content', this.get('content'));
    contactEditController.startEditing();
    this.set('isEditing', true);
  },

  stopEditing: function() {
    var contactEditController = this.controllerFor('contactEdit');
    contactEditController.stopEditing();
    this.set('isEditing', false);
  },

  destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.get('content').deleteRecord();
      this.get('store').commit();

      // return to the main contacts listing page
      this.get('target.router').transitionTo('contacts.index');
    }
  }
});
