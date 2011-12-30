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