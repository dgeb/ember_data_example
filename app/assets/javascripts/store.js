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
  serializer: App.RESTSerializer.create(),

  dirtyRecordsForHasManyChange: function(dirtySet, record, relationship) {
    // special handling for removal of phone numbers
    if (relationship.secondRecordName === 'phoneNumbers' &&
        record.constructor === App.Contact &&
        relationship.changeType === 'remove') {

      // TODO: understand why the default call to _dirtyTree() is causing problems
      // WORKAROUND: instead of calling _dirtyTree(), just dirty the parent and child records
      dirtySet.add(record);
      var childRecord = relationship.store.recordForReference(relationship.childReference);
      dirtySet.add(childRecord);

    } else {
      this._super.apply(this, arguments);
    }
  }
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.Adapter.create()
});
