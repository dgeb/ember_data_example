App.ShowContactInListView = Em.View.extend({
  templateName: 'app/templates/show_contact_in_list',
  tagName: 'li',
  classNameBindings: 'isActive:active',

  isActive: function() {
    var id = this.get('content.id'),
        currentPath = App.router.get('currentState.path');

    if (id) {
      return App.get('router.contactController.content.id') === id &&
             currentPath.indexOf('contacts.contact') > -1;
    } else {
      return currentPath.indexOf('contacts.newContact') > -1;
    }
  }.property('App.router.currentState', 'App.router.contactController.content')
});
