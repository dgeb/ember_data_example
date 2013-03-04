App.Adapter = DS.RESTAdapter.extend({
  bulkCommit: false
});

App.Adapter.map('App.Contact', {
  phoneNumbers: {embedded: 'always'}
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter:  App.Adapter.create()
});
