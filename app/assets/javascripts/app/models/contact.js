App.Contact  = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName:  DS.attr('string'),

  validate: function() {
    if (this.get('firstName') === undefined || this.get('firstName') === '' ||
        this.get('lastName') === undefined  || this.get('lastName') === '') {
      return 'Contacts require a first and a last name.';
    }
  },

  fullName: Em.computed(function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }).property('firstName', 'lastName')
});

App.Contact.reopenClass({
  collectionUrl: '/contacts',
  resourceUrl: '/contacts/%@',
  resourceName: 'contact'
});

DS.RESTAdapter.map('App.Contact', {
  firstName: { key: 'first_name' },
  lastName:  { key: 'last_name' }
});
