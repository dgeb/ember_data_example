App.PhoneNumber = DS.Model.extend({
	number: DS.attr('number'),
	contact: DS.belongsTo('App.Contact')
});