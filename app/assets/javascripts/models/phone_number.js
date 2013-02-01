App.PhoneNumber = DS.Model.extend({
  number:  DS.attr('string'),
  contact: DS.belongsTo('App.Contact')
});