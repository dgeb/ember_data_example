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
    var firstName = this.get('firstName'),
        lastName = this.get('lastName');

    if (!firstName && !lastName) {
      if (this.get('id') === undefined) {
        return '(New Contact)';
      } else {
        return '(No Name)';
      }
    }

    if (firstName === undefined) firstName = '';
    if (lastName === undefined) lastName = '';

    return firstName + ' ' + lastName;
  }).property('firstName', 'lastName')

}).reopenClass({
  collectionUrl: '/contacts',
  resourceUrl: '/contacts/%@',
  resourceName: 'contact'
});

DS.RESTAdapter.map('App.Contact', {
  firstName: { key: 'first_name' },
  lastName:  { key: 'last_name' }
});
