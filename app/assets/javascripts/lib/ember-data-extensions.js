DS.Store.reopen({
  loadAll: function(type, data) {
    var array = DS.ModelArray.create({ type: type, content: Em.A([]), store: this });
    this.registerModelArray(array, type);

    this.loadArray(type, data);

    return array;
  },

  loadArray: function(type, array) {
    // TODO: Why is it necessary to build a separate array of ids? Perhaps this logic could be included in loadMany()?
    var ids = [];
    for (var i = 0; i < array.length; i++) {
      ids.push(array[i].id);
    }
    this.loadMany(type, ids, array);
  }
});

// Add commit() method to adapter, as suggested in ember-data readme
DS.RESTAdapter.reopenClass({
  commit: function(store, commitDetails) {
    commitDetails.updated.eachType(function(type, array) {
      this.updateRecords(store, type, array.slice());
    }, this);

    commitDetails.created.eachType(function(type, array) {
      this.createRecords(store, type, array.slice());
    }, this);

    commitDetails.deleted.eachType(function(type, array) {
      this.deleteRecords(store, type, array.slice());
    }, this);
  }
});
