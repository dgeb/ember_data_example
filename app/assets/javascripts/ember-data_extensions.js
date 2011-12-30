DS.utils = {
  convertObjectPropertiesToCamelCase: function(obj) {
    for (var prop in obj) {
      if (prop.indexOf('_') > -1) {
        obj[this.toCamelCase(prop)] = obj[prop];
        delete obj[prop];
      }
    }
  },

  constructResource: function(name, data) {
    var resData = {},
        res = {};

    for (var prop in data) {
      resData[this.toSnakeCase(prop)] = data[prop];
    }

    res[name] = resData;
    return res;
  },

  toCamelCase: function(str) {
    return str.replace(/(\_[a-z])/g, function($1) { return $1.toUpperCase().replace('_',''); });
  },

  toSnakeCase: function(str) {
    return str.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); });
  }
};

DS.Store.reopen({
  loadAll: function(type, data) {
    var array = DS.ModelArray.create({ type: type, content: Em.A([]), store: this });
    this.registerModelArray(array, type);

    this.loadArray(type, data);

    return array;
  },

  loadArray: function(type, array) {
    var ids = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      ids.push(obj.id);
      DS.utils.convertObjectPropertiesToCamelCase(obj);
    }
    this.loadMany(type, ids, array);
  }
});