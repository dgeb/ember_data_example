DS.Store.reopen({
  loadAll: function(type, data) {
    this.loadMany(type, data);

    var array = DS.ModelArray.create({ type: type, content: Em.A([]), store: this });
    this.registerModelArray(array, type);

    var typeMap = this.typeMapFor(type);
    typeMap.findAllCache = array;

    return array;
  }
});
