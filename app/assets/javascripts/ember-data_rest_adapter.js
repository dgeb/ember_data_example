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

  update: function(store, type, model) {
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

  create: function(store, type, model) {
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

  deleteModel: function(store, type, model) {
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
