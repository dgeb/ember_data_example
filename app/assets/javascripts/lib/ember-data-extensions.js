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

DS.restAdapter = DS.Adapter.create({
  find: function(store, type, id) {
    jQuery.getJSON(type.prototype.resourceUrl.fmt(id), function(data) {
      store.load(type, id, data);
    });
  },

  findAll: function(store, type) {
    jQuery.getJSON(type.prototype.collectionUrl, function(data) {
      store.loadArray(type, data);
    });
  },

  updateRecord: function(store, type, model) {
    var data = {};
    data[type.prototype.resourceName] = model.get('data');

    jQuery.ajax({
      url: type.prototype.resourceUrl.fmt(model.get('id')),
      data: data,
      dataType: 'json',
      type: 'PUT',
      success: function(data) {
        store.didUpdateModel(model, data);
      }
    });
  },

  createRecord: function(store, type, model) {
    var data = {};
    data[type.prototype.resourceName] = model.get('data');

    jQuery.ajax({
      url: type.prototype.collectionUrl.fmt(model.get('id')),
      data: data,
      dataType: 'json',
      type: 'POST',
      success: function(data) {
        store.didCreateModel(model, data);
      }
    });
  },

  deleteRecord: function(store, type, model) {
    jQuery.ajax({
      url: type.prototype.resourceUrl.fmt(model.get('id')),
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
        store.didDeleteModel(model, data);
      }
    });
  }
});
