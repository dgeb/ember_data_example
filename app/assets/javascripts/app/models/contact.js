App.Contact  = DS.Model.extend({
  collectionUrl: '/contacts',
  resourceUrl: '/contacts/%@',
  resourceName: 'contact',

  firstName: DS.attr('string'),
  lastName:  DS.attr('string'),

  fullName: Em.computed(function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');

    return firstName + ' ' + lastName;
  }).property('firstName', 'lastName')
});
