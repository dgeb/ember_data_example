App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('contactsIndex');
  }
});
