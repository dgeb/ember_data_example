App.Router = Ember.Router.extend({
  location: 'hash',

  root: Em.Route.extend({
    contacts: Em.Route.extend({
      route: '/',

      refreshListing: function(router, context) {
        router.get('contactsController').findAll();
      },

      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('contacts');
      }
    })
  })
});