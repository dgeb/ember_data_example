App.RESTSerializer = DS.RESTSerializer.extend({
  init: function() {
    this._super();

    this.map('App.Contact', {
      phoneNumbers: {embedded: 'always'}
    });
  }
});

App.Adapter = DS.RESTAdapter.extend({
  bulkCommit: false,
  serializer: App.RESTSerializer.create()
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.Adapter.create()
});
