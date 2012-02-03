App.Contact  = DS.Model.extend({
  first_name: DS.attr('string'),
  last_name:  DS.attr('string'),

  validate: function() {
    if (this.get('first_name') === undefined || this.get('first_name') === '' ||
        this.get('last_name') === undefined  || this.get('last_name') === '') {
      return 'Contacts require a first and a last name.';
    }
  },

  fullName: Em.computed(function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }).property('first_name', 'last_name')
});

App.Contact.reopenClass({
  collectionUrl: '/contacts',
  resourceUrl: '/contacts/%@',
  resourceName: 'contact'
});
