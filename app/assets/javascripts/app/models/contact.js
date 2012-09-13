App.Contact  = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName:  DS.attr('string'),
  email:     DS.attr('string'),
  notes:     DS.attr('string'),

  fullName: function() {
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
  }.property('firstName', 'lastName'),

  gravatar: function() {
    var email = this.get('email');
    if (!email) email = '';
    return 'http://www.gravatar.com/avatar/' + MD5(email);
  }.property('email')

}).reopenClass({
  collectionUrl: '/contacts',
  resourceUrl: '/contacts/%@',
  resourceName: 'contact'
});

DS.RESTAdapter.map('App.Contact', {
  firstName: { key: 'first_name' },
  lastName:  { key: 'last_name' }
});
