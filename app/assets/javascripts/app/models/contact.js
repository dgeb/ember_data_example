App.Contact  = DS.Model.extend({
  collectionUrl: '/contacts',
  resourceUrl: '/contacts/%@',
  resourceName: 'contact',

  first_name: DS.attr('string'),
  last_name:  DS.attr('string'),

  validate: function(userData) {
    if (userData.first_name === '' || userData.last_name === '')
      return 'Contacts require a first and a last name.';
  },

  fullName: Em.computed(function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }).property('first_name', 'last_name')
});
