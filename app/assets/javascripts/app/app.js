App = Em.Application.create({});
App.Serializer = DS.Serializer.extend({
  keyForBelongsTo: function(type, name) {
    return this.keyForAttributeName(type, name) + "_id";
  },

  keyForAttributeName: function(type, name) {
    return Ember.String.decamelize(name);
  },

  addBelongsTo: function(hash, record, key, relationship) {
  	hash[this.keyForBelongsTo(record.constructor, key)] = record.get(key).get(this.primaryKey());
  }
});

App.Store = DS.Store.extend({
    adapter:  DS.RESTAdapter.create({
    	serializer: App.Serializer.create()
    }),
    revision: 5
});