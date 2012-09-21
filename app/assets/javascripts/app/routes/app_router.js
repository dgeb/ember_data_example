App.Router = Ember.Router.extend({
  location: 'hash',

  root: Em.Route.extend({
    contacts: Em.Route.extend({
      route: '/',

      showContact: function(router, event) {
        router.transitionTo('contacts.contact.index', event.context);
      },

      showNewContact: function(router) {
        router.transitionTo('contacts.newContact', {});
      },

      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('contacts');
      },

      index: Em.Route.extend({
        route: '/',

        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('contacts');
        }
      }),

      newContact: Em.Route.extend({
        route: '/contacts/new',

        cancelEdit: function(router) {
          router.transitionTo('contacts.index');
        },

        connectOutlets: function(router) {
          router.get('contactsController').connectOutlet('editContact', {});
          router.get('editContactController').enterEditing();
        },

        exit: function(router) {
          router.get('editContactController').exitEditing();
        }
      }),

      contact: Em.Route.extend({
        route: '/contacts/:contact_id',

        connectOutlets: function(router, context) {
          router.get('contactsController').connectOutlet('contact', context);
        },

        index: Em.Route.extend({
          route: '/',

          showEdit: function(router) {
            router.transitionTo('contacts.contact.edit');
          },

          connectOutlets: function(router, context) {
            router.get('contactController').connectOutlet('showContact');
          }
        }),

        edit: Em.Route.extend({
          route: 'edit',

          cancelEdit: function(router) {
            router.transitionTo('contacts.contact.index');
          },

          connectOutlets: function(router) {
            var contactController = router.get('contactController');
            contactController.connectOutlet('editContact', contactController.get('content'));
            router.get('editContactController').enterEditing();
          },

          exit: function(router) {
            router.get('editContactController').exitEditing();
          }
        })
      })
    })
  })
});