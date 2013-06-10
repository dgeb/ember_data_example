App.ContactRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);

    // reset editing state
    // note: this is necessary here because `deactivate` won't be called when transitioning
    //       from one ContactRoute directly into another
    if (controller.get('isEditing')) {
      controller.stopEditing();
    }

    // highlight this contact as active
    this.controllerFor('contacts').set('activeContactId', model.get('id'));
  },

  deactivate: function() {
    var controller = this.controllerFor('contact');

    // reset editing state
    if (controller.get('isEditing')) {
      controller.stopEditing();
    }

    // un-highlight the active contact (perhaps temporarily)
    this.controllerFor('contacts').set('activeContactId', null);
  }
});
