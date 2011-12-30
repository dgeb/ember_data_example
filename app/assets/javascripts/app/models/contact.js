App.Contact  = DS.Model.extend({
  collectionUrl: '/contacts',
  resourceUrl: '/contacts/%@',
  resourceName: 'contact',

  first_name: DS.attr('string'),
  last_name:  DS.attr('string'),

  fullName: Em.computed(function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }).property('first_name', 'last_name')
});
