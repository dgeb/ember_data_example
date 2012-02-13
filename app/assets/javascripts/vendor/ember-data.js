
(function(exports) {
window.DS = Ember.Namespace.create();

})({});


(function(exports) {
DS.Adapter = Ember.Object.extend({
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
  },

  createRecords: function(store, type, models) {
    models.forEach(function(model) {
      this.createRecord(store, type, model);
    }, this);
  },

  updateRecords: function(store, type, models) {
    models.forEach(function(model) {
      this.updateRecord(store, type, model);
    }, this);
  },

  deleteRecords: function(store, type, models) {
    models.forEach(function(model) {
      this.deleteRecord(store, type, model);
    }, this);
  },

  findMany: function(store, type, ids) {
    ids.forEach(function(id) {
      this.find(store, type, id);
    }, this);
  }
});
})({});


(function(exports) {
DS.fixtureAdapter = DS.Adapter.create({
  find: function(store, type, id) {
    var fixtures = type.FIXTURES;

    ember_assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);
    if (fixtures.hasLoaded) { return; }

    setTimeout(function() {
      store.loadMany(type, fixtures);
      fixtures.hasLoaded = true;
    }, 300);
  },

  findMany: function() {
    this.find.apply(this, arguments);
  },

  findAll: function(store, type) {
    var fixtures = type.FIXTURES;

    ember_assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    var ids = fixtures.map(function(item, index, self){ return item.id });
    store.loadMany(type, ids, fixtures);
  }

});

})({});


(function(exports) {
var get = Ember.get, set = Ember.set, getPath = Ember.getPath;

DS.RESTAdapter = DS.Adapter.extend({
  createRecord: function(store, type, model) {
    var root = this.rootForType(type);

    var data = {};
    data[root] = get(model, 'data');

    this.ajax("/" + this.pluralize(root), "POST", {
      data: data,
      success: function(json) {
        store.didCreateRecord(model, json[root]);
      }
    });
  },

  createRecords: function(store, type, models) {
    if (get(this, 'bulkCommit') === false) {
      return this._super(store, type, models);
    }

    var root = this.rootForType(type),
        plural = this.pluralize(root);

    var data = {};
    data[plural] = models.map(function(model) {
      return get(model, 'data');
    });

    this.ajax("/" + this.pluralize(root), "POST", {
      data: data,
      success: function(json) {
        store.didCreateRecords(type, models, json[plural]);
      }
    });
  },

  updateRecord: function(store, type, model) {
    var primaryKey = getPath(type, 'proto.primaryKey'),
        id = get(model, primaryKey);
    var root = this.rootForType(type);

    var data = {};
    data[root] = get(model, 'data');

    var url = ["", this.pluralize(root), id].join("/");

    this.ajax(url, "PUT", {
      data: data,
      success: function(json) {
        store.didUpdateRecord(model, json[root]);
      }
    });
  },

  updateRecords: function(store, type, models) {
    if (get(this, 'bulkCommit') === false) {
      return this._super(store, type, models);
    }

    var root = this.rootForType(type),
        plural = this.pluralize(root);

    var data = {};
    data[plural] = models.map(function(model) {
      return get(model, 'data');
    });

    this.ajax("/" + this.pluralize(root), "POST", {
      data: data,
      success: function(json) {
        store.didUpdateRecords(models, json[plural]);
      }
    });
  },

  deleteRecord: function(store, type, model) {
    var primaryKey = getPath(type, 'proto.primaryKey'),
        id = get(model, primaryKey);
    var root = this.rootForType(type);

    var url = ["", this.pluralize(root), id].join("/");

    this.ajax(url, "DELETE", {
      success: function(json) {
        store.didDeleteRecord(model);
      }
    });
  },

  deleteRecords: function(store, type, models) {
    if (get(this, 'bulkCommit') === false) {
      return this._super(store, type, models);
    }

    var root = this.rootForType(type),
        plural = this.pluralize(root),
        primaryKey = getPath(type, 'proto.primaryKey');

    var data = {};
    data[plural] = models.map(function(model) {
      return get(model, primaryKey);
    });

    this.ajax("/" + this.pluralize(root) + "/delete", "POST", {
      data: data,
      success: function(json) {
        store.didDeleteRecords(models);
      }
    });
  },

  find: function(store, type, id) {
    var root = this.rootForType(type);

    var url = ["", this.pluralize(root), id].join("/");

    this.ajax(url, "GET", {
      success: function(json) {
        store.load(type, json[root]);
      }
    });
  },

  findMany: function(store, type, ids) {
    var root = this.rootForType(type), plural = this.pluralize(root);

    this.ajax("/" + plural, "GET", {
      data: { ids: ids },
      success: function(json) {
        store.loadMany(type, ids, json[plural]);
      }
    });
    var url = "/" + plural;
  },

  findAll: function(store, type) {
    var root = this.rootForType(type), plural = this.pluralize(root);

    this.ajax("/" + plural, "GET", {
      success: function(json) {
        store.loadMany(type, json[plural]);
      }
    });
  },

  findQuery: function(store, type, query, modelArray) {
    var root = this.rootForType(type), plural = this.pluralize(root);

    this.ajax("/" + plural, "GET", {
      data: query,
      success: function(json) {
        modelArray.load(json[plural]);
      }
    });
  },

  // HELPERS

  plurals: {},

  // define a plurals hash in your subclass to define
  // special-case pluralization
  pluralize: function(name) {
    return this.plurals[name] || name + "s";
  },

  rootForType: function(type) {
    if (type.url) { return type.url; }

    // use the last part of the name as the URL
    var parts = type.toString().split(".");
    var name = parts[parts.length - 1];
    return name.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
  },

  ajax: function(url, type, hash) {
    hash.url = url;
    hash.type = type;
    hash.dataType = "json";

    jQuery.ajax(hash);
  }
});


})({});


(function(exports) {
var get = Ember.get, set = Ember.set;

DS.ModelArray = Ember.ArrayProxy.extend({
  type: null,
  content: null,
  store: null,

  init: function() {
    set(this, 'modelCache', Ember.A([]));
    this._super();
  },

  replace: function(index, removed, added) {
    added = added.map(function(item) {
      ember_assert("You can only add items of " + (get(this, 'type') && get(this, 'type').toString()) + " to this association.", !get(this, 'type') || (get(this, 'type') === item.constructor));
      return item.get('clientId');
    });

    this._super(index, removed, added);
  },

  arrayDidChange: function(array, index, removed, added) {
    var modelCache = get(this, 'modelCache');
    modelCache.replace(index, 0, Array(added));

    this._super(array, index, removed, added);
  },

  arrayWillChange: function(array, index, removed, added) {
    this._super(array, index, removed, added);

    var modelCache = get(this, 'modelCache');
    modelCache.replace(index, removed);
  },

  objectAtContent: function(index) {
    var modelCache = get(this, 'modelCache');
    var model = modelCache.objectAt(index);

    if (!model) {
      var store = get(this, 'store');
      var content = get(this, 'content');

      var contentObject = content.objectAt(index);

      if (contentObject !== undefined) {
        model = store.findByClientId(get(this, 'type'), contentObject);
        modelCache.replace(index, 1, [model]);
      }
    }

    return model;
  }
});

DS.FilteredModelArray = DS.ModelArray.extend({
  filterFunction: null,

  updateFilter: Ember.observer(function() {
    var store = get(this, 'store');
    store.updateModelArrayFilter(this, get(this, 'type'), get(this, 'filterFunction'));
  }, 'filterFunction')
});

DS.AdapterPopulatedModelArray = DS.ModelArray.extend({
  query: null,
  isLoaded: false,

  load: function(array) {
    var store = get(this, 'store'), type = get(this, 'type');

    var clientIds = store.loadMany(type, array).clientIds;

    this.beginPropertyChanges();
    set(this, 'content', Ember.A(clientIds));
    set(this, 'isLoaded', true);
    this.endPropertyChanges();
  }
});

})({});


(function(exports) {
var get = Ember.get, set = Ember.set, getPath = Ember.getPath, fmt = Ember.String.fmt;

var OrderedSet = Ember.Object.extend({
  init: function() {
    this.clear();
  },

  clear: function() {
    this.set('presenceSet', {});
    this.set('list', Ember.NativeArray.apply([]));
  },

  add: function(obj) {
    var guid = Ember.guidFor(obj),
        presenceSet = get(this, 'presenceSet'),
        list = get(this, 'list');

    if (guid in presenceSet) { return; }

    presenceSet[guid] = true;
    list.pushObject(obj);
  },

  remove: function(obj) {
    var guid = Ember.guidFor(obj),
        presenceSet = get(this, 'presenceSet'),
        list = get(this, 'list');

    delete presenceSet[guid];
    list.removeObject(obj);
  },

  isEmpty: function() {
    return getPath(this, 'list.length') === 0;
  },

  forEach: function(fn, self) {
    get(this, 'list').forEach(function(item) {
      fn.call(self, item);
    });
  },

  toArray: function() {
    return get(this, 'list').slice();
  }
});

/**
  A Hash stores values indexed by keys. Unlike JavaScript's
  default Objects, the keys of a Hash can be any JavaScript
  object.

  Internally, a Hash has two data structures:

    `keys`: an OrderedSet of all of the existing keys
    `values`: a JavaScript Object indexed by the
      Ember.guidFor(key)

  When a key/value pair is added for the first time, we
  add the key to the `keys` OrderedSet, and create or
  replace an entry in `values`. When an entry is deleted,
  we delete its entry in `keys` and `values`.
*/

var Hash = Ember.Object.extend({
  init: function() {
    set(this, 'keys', OrderedSet.create());
    set(this, 'values', {});
  },

  add: function(key, value) {
    var keys = get(this, 'keys'), values = get(this, 'values');
    var guid = Ember.guidFor(key);

    keys.add(key);
    values[guid] = value;

    return value;
  },

  remove: function(key) {
    var keys = get(this, 'keys'), values = get(this, 'values');
    var guid = Ember.guidFor(key), value;

    keys.remove(key);

    value = values[guid];
    delete values[guid];

    return value;
  },

  fetch: function(key) {
    var values = get(this, 'values');
    var guid = Ember.guidFor(key);

    return values[guid];
  },

  forEach: function(fn, binding) {
    var keys = get(this, 'keys'), values = get(this, 'values');

    keys.forEach(function(key) {
      var guid = Ember.guidFor(key);
      fn.call(binding, key, values[guid]);
    });
  }
});

DS.Transaction = Ember.Object.extend({
  init: function() {
    set(this, 'dirty', {
      created: Hash.create(),
      updated: Hash.create(),
      deleted: Hash.create()
    });
  },

  createRecord: function(type, hash) {
    var store = get(this, 'store');

    return store.createRecord(type, hash, this);
  },

  add: function(model) {
    var modelTransaction = get(model, 'transaction');
    ember_assert("Models cannot belong to more than one transaction at a time.", !modelTransaction);

    set(model, 'transaction', this);
  },

  modelBecameDirty: function(kind, model) {
    var dirty = get(get(this, 'dirty'), kind),
        type = model.constructor;

    var models = dirty.fetch(type);

    models = models || dirty.add(type, OrderedSet.create());
    models.add(model);
  },

  modelBecameClean: function(kind, model) {
    var dirty = get(get(this, 'dirty'), kind),
        type = model.constructor;

    var models = dirty.fetch(type);
    models.remove(model);

    set(model, 'transaction', null);
  },

  commit: function() {
    var dirtyMap = get(this, 'dirty');

    var iterate = function(kind, fn, binding) {
      var dirty = get(dirtyMap, kind);

      dirty.forEach(function(type, models) {
        if (models.isEmpty()) { return; }

        models.forEach(function(model) { model.willCommit(); });
        fn.call(binding, type, models.toArray());
      });
    };

    var commitDetails = {
      updated: {
        eachType: function(fn, binding) { iterate('updated', fn, binding); }
      },

      created: {
        eachType: function(fn, binding) { iterate('created', fn, binding); }
      },

      deleted: {
        eachType: function(fn, binding) { iterate('deleted', fn, binding); }
      }
    };

    var store = get(this, 'store');
    var adapter = get(store, '_adapter');
    if (adapter && adapter.commit) { adapter.commit(store, commitDetails); }
    else { throw fmt("Adapter is either null or do not implement `commit` method", this); }
  }
});

})({});


(function(exports) {
var get = Ember.get, set = Ember.set, getPath = Ember.getPath, fmt = Ember.String.fmt;

var OrderedSet = Ember.Object.extend({
  init: function() {
    this.clear();
  },

  clear: function() {
    this.set('presenceSet', {});
    this.set('list', Ember.NativeArray.apply([]));
  },

  add: function(obj) {
    var guid = Ember.guidFor(obj),
        presenceSet = get(this, 'presenceSet'),
        list = get(this, 'list');

    if (guid in presenceSet) { return; }

    presenceSet[guid] = true;
    list.pushObject(obj);
  },

  remove: function(obj) {
    var guid = Ember.guidFor(obj),
        presenceSet = get(this, 'presenceSet'),
        list = get(this, 'list');

    delete presenceSet[guid];
    list.removeObject(obj);
  },

  isEmpty: function() {
    return getPath(this, 'list.length') === 0;
  },

  forEach: function(fn, self) {
    get(this, 'list').forEach(function(item) {
      fn.call(self, item);
    });
  }
});

// Implementors Note:
//
//   The variables in this file are consistently named according to the following
//   scheme:
//
//   * +id+ means an identifier managed by an external source, provided inside the
//     data hash provided by that source.
//   * +clientId+ means a transient numerical identifier generated at runtime by
//     the data store. It is important primarily because newly created objects may
//     not yet have an externally generated id.
//   * +type+ means a subclass of DS.Model.

/**
  The store contains all of the hashes for data models loaded from the server.
  It is also responsible for creating instances of DS.Model when you request one
  of these data hashes, so that they can be bound to in your Handlebars templates.

  Create a new store like this:

       MyApp.store = DS.Store.create();

  You can retrieve DS.Model instances from the store in several ways. To retrieve
  a model for a specific id, use the `find()` method:

       var model = MyApp.store.find(MyApp.Contact, 123);

   By default, the store will talk to your backend using a standard REST mechanism.
   You can customize how the store talks to your backend by specifying a custom adapter:

       MyApp.store = DS.Store.create({
         adapter: 'MyApp.CustomAdapter'
       });

    You can learn more about writing a custom adapter by reading the `DS.Adapter`
    documentation.
*/
DS.Store = Ember.Object.extend({

  /**
    Many methods can be invoked without specifying which store should be used.
    In those cases, the first store created will be used as the default. If
    an application has multiple stores, it should specify which store to use
    when performing actions, such as finding records by id.

    The init method registers this store as the default if none is specified.
  */
  init: function() {
    if (!get(DS, 'defaultStore') || get(this, 'isDefaultStore')) {
      set(DS, 'defaultStore', this);
    }

    set(this, 'data', []);
    set(this, '_typeMap', {});
    set(this, 'models', []);
    set(this, 'modelArrays', []);
    set(this, 'modelArraysByClientId', {});
    set(this, 'defaultTransaction', DS.Transaction.create({ store: this }));

    return this._super();
  },

  transaction: function() {
    return DS.Transaction.create({ store: this });
  },

  modelArraysForClientId: function(clientId) {
    var modelArrays = get(this, 'modelArraysByClientId');
    var ret = modelArrays[clientId];

    if (!ret) {
      ret = modelArrays[clientId] = OrderedSet.create();
    }

    return ret;
  },

  /**
    The adapter to use to communicate to a backend server or other persistence layer.

    This can be specified as an instance, a class, or a property path that specifies
    where the adapter can be located.

    @property {DS.Adapter|String}
  */
  adapter: null,

  _adapter: Ember.computed(function() {
    var adapter = get(this, 'adapter');
    if (typeof adapter === 'string') {
      return getPath(this, adapter, false) || getPath(window, adapter);
    }
    return adapter;
  }).property('adapter').cacheable(),

  clientIdCounter: -1,

  // ....................
  // . CREATE NEW MODEL .
  // ....................

  createRecord: function(type, hash, transaction) {
    hash = hash || {};

    var id = hash[getPath(type, 'proto.primaryKey')] || null;

    var model = type.create({
      data: hash || {},
      store: this,
      transaction: transaction
    });

    model.adapterDidCreate();

    var data = this.clientIdToHashMap(type);
    var models = get(this, 'models');

    var clientId = this.pushHash(hash, id, type);

    set(model, 'clientId', clientId);

    models[clientId] = model;

    this.updateModelArrays(type, clientId, hash);

    return model;
  },

  // ................
  // . DELETE MODEL .
  // ................

  deleteRecord: function(model) {
    model.deleteRecord();
  },

  // ...............
  // . FIND MODELS .
  // ...............

  /**
    Finds a model by its id. If the data for that model has already been
    loaded, an instance of DS.Model with that data will be returned
    immediately. Otherwise, an empty DS.Model instance will be returned in
    the loading state. As soon as the requested data is available, the model
    will be moved into the loaded state and all of the information will be
    available.

    Note that only one DS.Model instance is ever created per unique id for a
    given type.

    Example:

        var record = MyApp.store.find(MyApp.Person, 1234);

    @param {DS.Model} type
    @param {String|Number} id
  */
  find: function(type, id, query) {
    if (id === undefined) {
      return this.findMany(type, null, null);
    }

    if (query !== undefined) {
      return this.findMany(type, id, query);
    } else if (Ember.typeOf(id) === 'object') {
      return this.findQuery(type, id);
    }

    if (Ember.isArray(id)) {
      return this.findMany(type, id);
    }

    var clientId = this.clientIdForId(type, id);

    return this.findByClientId(type, clientId, id);
  },

  findByClientId: function(type, clientId, id) {
    var model;

    var models = get(this, 'models');
    var data = this.clientIdToHashMap(type);

    // If there is already a clientId assigned for this
    // type/id combination, try to find an existing
    // model for that id and return. Otherwise,
    // materialize a new model and set its data to the
    // value we already have.
    if (clientId !== undefined) {
      model = models[clientId];

      if (!model) {
        // create a new instance of the model in the
        // 'isLoading' state
        model = this.createModel(type, clientId);

        // immediately set its data
        model.setData(data[clientId] || null);
      }
    } else {
      clientId = this.pushHash(null, id, type);

      // create a new instance of the model in the
      // 'isLoading' state
      model = this.createModel(type, clientId);

      // let the adapter set the data, possibly async
      var adapter = get(this, '_adapter');
      if (adapter && adapter.find) { adapter.find(this, type, id); }
      else { throw fmt("Adapter is either null or does not implement `find` method", this); }
    }

    return model;
  },

  /** @private
  */
  findMany: function(type, ids, query) {
    var idToClientIdMap = this.idToClientIdMap(type);
    var data = this.clientIdToHashMap(type), needed;

    var clientIds = Ember.A([]);

    if (ids) {
      needed = [];

      ids.forEach(function(id) {
        var clientId = idToClientIdMap[id];
        if (clientId === undefined || data[clientId] === undefined) {
          clientId = this.pushHash(null, id, type);
          needed.push(id);
        }

        clientIds.push(clientId);
      }, this);
    } else {
      needed = null;
    }

    if ((needed && get(needed, 'length') > 0) || query) {
      var adapter = get(this, '_adapter');
      if (adapter && adapter.findMany) { adapter.findMany(this, type, needed, query); }
      else { throw fmt("Adapter is either null or does not implement `findMany` method", this); }
    }

    return this.createModelArray(type, clientIds);
  },

  findQuery: function(type, query) {
    var array = DS.AdapterPopulatedModelArray.create({ type: type, content: Ember.A([]), store: this });
    var adapter = get(this, '_adapter');
    if (adapter && adapter.findQuery) { adapter.findQuery(this, type, query, array); }
    else { throw fmt("Adapter is either null or does not implement `findQuery` method", this); }
    return array;
  },

  findAll: function(type) {

    var typeMap = this.typeMapFor(type),
        findAllCache = typeMap.findAllCache;

    if (findAllCache) { return findAllCache; }

    var array = DS.ModelArray.create({ type: type, content: Ember.A([]), store: this });
    this.registerModelArray(array, type);

    var adapter = get(this, '_adapter');
    if (adapter && adapter.findAll) { adapter.findAll(this, type); }

    typeMap.findAllCache = array;
    return array;
  },

  filter: function(type, filter) {
    var array = DS.FilteredModelArray.create({ type: type, content: Ember.A([]), store: this, filterFunction: filter });

    this.registerModelArray(array, type, filter);

    return array;
  },

  // ............
  // . UPDATING .
  // ............

  hashWasUpdated: function(type, clientId) {
    var clientIdToHashMap = this.clientIdToHashMap(type);
    var hash = clientIdToHashMap[clientId];

    this.updateModelArrays(type, clientId, hash);
  },

  // ..............
  // . PERSISTING .
  // ..............

  commit: function() {
    get(this, 'defaultTransaction').commit();
  },

  didUpdateRecords: function(array, hashes) {
    if (arguments.length === 2) {
      array.forEach(function(model, idx) {
        this.didUpdateRecord(model, hashes[idx]);
      }, this);
    } else {
      array.forEach(function(model) {
        this.didUpdateRecord(model);
      }, this);
    }
  },

  didUpdateRecord: function(model, hash) {
    if (arguments.length === 2) {
      var clientId = get(model, 'clientId');
      var data = this.clientIdToHashMap(model.constructor);

      data[clientId] = hash;
      model.set('data', hash);
    }

    model.adapterDidUpdate();
  },

  didDeleteRecords: function(array) {
    array.forEach(function(model) {
      model.adapterDidDelete();
    });
  },

  didDeleteRecord: function(model) {
    model.adapterDidDelete();
  },

  didCreateRecords: function(type, array, hashes) {
    var id, clientId, primaryKey = getPath(type, 'proto.primaryKey');

    var idToClientIdMap = this.idToClientIdMap(type);
    var data = this.clientIdToHashMap(type);
    var idList = this.idList(type);

    for (var i=0, l=get(array, 'length'); i<l; i++) {
      var model = array[i], hash = hashes[i];
      id = hash[primaryKey];
      clientId = get(model, 'clientId');

      data[clientId] = hash;
      set(model, 'data', hash);

      idToClientIdMap[id] = clientId;
      idList.push(id);

      model.adapterDidUpdate();
    }
  },

  didCreateRecord: function(model, hash) {
    var type = model.constructor;

    var id, clientId, primaryKey = getPath(type, 'proto.primaryKey');

    var idToClientIdMap = this.idToClientIdMap(type);
    var data = this.clientIdToHashMap(type);
    var idList = this.idList(type);

    id = hash[primaryKey];

    clientId = get(model, 'clientId');
    data[clientId] = hash;
    set(model, 'data', hash);

    idToClientIdMap[id] = clientId;
    idList.push(id);

    model.adapterDidUpdate();
  },

  recordWasInvalid: function(record, errors) {
    record.wasInvalid(errors);
  },

  // ................
  // . MODEL ARRAYS .
  // ................

  registerModelArray: function(array, type, filter) {
    var modelArrays = get(this, 'modelArrays');
    var idToClientIdMap = this.idToClientIdMap(type);

    modelArrays.push(array);

    this.updateModelArrayFilter(array, type, filter);
  },

  createModelArray: function(type, clientIds) {
    var array = DS.ModelArray.create({ type: type, content: clientIds, store: this });

    clientIds.forEach(function(clientId) {
      var modelArrays = this.modelArraysForClientId(clientId);
      modelArrays.add(array);
    }, this);

    return array;
  },

  updateModelArrayFilter: function(array, type, filter) {
    var data = this.clientIdToHashMap(type);
    var allClientIds = this.clientIdList(type);

    for (var i=0, l=allClientIds.length; i<l; i++) {
      clientId = allClientIds[i];

      hash = data[clientId];

      if (hash) {
        this.updateModelArray(array, filter, type, clientId, hash);
      }
    }
  },

  updateModelArrays: function(type, clientId, hash) {
    var modelArrays = get(this, 'modelArrays');

    modelArrays.forEach(function(array) {
          modelArrayType = get(array, 'type');
          filter = get(array, 'filterFunction');

      if (type !== modelArrayType) { return; }

      this.updateModelArray(array, filter, type, clientId, hash);
    }, this);
  },

  updateModelArray: function(array, filter, type, clientId, hash) {
    var shouldBeInArray;

    if (!filter) {
      shouldBeInArray = true;
    } else {
      shouldBeInArray = filter(hash);
    }

    var content = get(array, 'content');
    var alreadyInArray = content.indexOf(clientId) !== -1;

    var modelArrays = this.modelArraysForClientId(clientId);

    if (shouldBeInArray && !alreadyInArray) {
      modelArrays.add(array);
      content.pushObject(clientId);
    } else if (!shouldBeInArray && alreadyInArray) {
      modelArrays.remove(array);
      content.removeObject(clientId);
    }
  },

  removeFromModelArrays: function(model) {
    var clientId = get(model, 'clientId');
    var modelArrays = this.modelArraysForClientId(clientId);

    modelArrays.forEach(function(array) {
      var content = get(array, 'content');
      content.removeObject(clientId);
    });
  },

  // ............
  // . TYPE MAP .
  // ............

  typeMapFor: function(type) {
    var ids = get(this, '_typeMap');
    var guidForType = Ember.guidFor(type);

    var typeMap = ids[guidForType];

    if (typeMap) {
      return typeMap;
    } else {
      return (ids[guidForType] =
        {
          idToCid: {},
          idList: [],
          cidList: [],
          cidToHash: {}
      });
    }
  },

  idToClientIdMap: function(type) {
    return this.typeMapFor(type).idToCid;
  },

  idList: function(type) {
    return this.typeMapFor(type).idList;
  },

  clientIdList: function(type) {
    return this.typeMapFor(type).cidList;
  },

  clientIdToHashMap: function(type) {
    return this.typeMapFor(type).cidToHash;
  },

  /** @private

    For a given type and id combination, returns the client id used by the store.
    If no client id has been assigned yet, `undefined` is returned.

    @param {DS.Model} type
    @param {String|Number} id
  */
  clientIdForId: function(type, id) {
    return this.typeMapFor(type).idToCid[id];
  },

  idForHash: function(type, hash) {
    var primaryKey = getPath(type, 'proto.primaryKey');

    ember_assert("A data hash was loaded for a model of type " + type.toString() + " but no primary key '" + primaryKey + "' was provided.", !!hash[primaryKey]);
    return hash[primaryKey];
  },

  // ................
  // . LOADING DATA .
  // ................

  /**
    Load a new data hash into the store for a given id and type combination.
    If data for that model had been loaded previously, the new information
    overwrites the old.

    If the model you are loading data for has outstanding changes that have not
    yet been saved, an exception will be thrown.

    @param {DS.Model} type
    @param {String|Number} id
    @param {Object} hash the data hash to load
  */
  load: function(type, id, hash) {
    if (hash === undefined) {
      hash = id;
      var primaryKey = getPath(type, 'proto.primaryKey');
      ember_assert("A data hash was loaded for a model of type " + type.toString() + " but no primary key '" + primaryKey + "' was provided.", !!hash[primaryKey]);
      id = hash[primaryKey];
    }

    var data = this.clientIdToHashMap(type);
    var models = get(this, 'models');

    var clientId = this.clientIdForId(type, id);

    if (clientId !== undefined) {
      data[clientId] = hash;

      var model = models[clientId];
      if (model) {
        model.willLoadData();
        model.setData(hash);
      }
    } else {
      clientId = this.pushHash(hash, id, type);
    }

    this.updateModelArrays(type, clientId, hash);

    return { id: id, clientId: clientId };
  },

  loadMany: function(type, ids, hashes) {
    var clientIds = Ember.A([]);

    if (hashes === undefined) {
      hashes = ids;
      ids = [];
      var primaryKey = getPath(type, 'proto.primaryKey');

      ids = hashes.map(function(hash) {
        ember_assert("A data hash was loaded for a model of type " + type.toString() + " but no primary key '" + primaryKey + "' was provided.", !!hash[primaryKey]);
        return hash[primaryKey];
      });
    }

    for (var i=0, l=get(ids, 'length'); i<l; i++) {
      var loaded = this.load(type, ids[i], hashes[i]);
      clientIds.pushObject(loaded.clientId);
    }

    return { clientIds: clientIds, ids: ids };
  },

  /** @private

    Stores a data hash for the specified type and id combination and returns
    the client id.

    @param {Object} hash
    @param {String|Number} id
    @param {DS.Model} type
    @returns {Number}
  */
  pushHash: function(hash, id, type) {
    var idToClientIdMap = this.idToClientIdMap(type);
    var clientIdList = this.clientIdList(type);
    var idList = this.idList(type);
    var data = this.clientIdToHashMap(type);

    var clientId = this.incrementProperty('clientIdCounter');

    data[clientId] = hash;

    // if we're creating an item, this process will be done
    // later, once the object has been persisted.
    if (id) {
      idToClientIdMap[id] = clientId;
      idList.push(id);
    }

    clientIdList.push(clientId);

    return clientId;
  },

  // .........................
  // . MODEL MATERIALIZATION .
  // .........................

  createModel: function(type, clientId) {
    var model;

    get(this, 'models')[clientId] = model = type.create({ store: this, clientId: clientId });
    set(model, 'clientId', clientId);
    model.loadingData();
    return model;
  }
});


})({});


(function(exports) {
var get = Ember.get, set = Ember.set, getPath = Ember.getPath;

var stateProperty = Ember.computed(function(key) {
  var parent = get(this, 'parentState');
  if (parent) {
    return get(parent, key);
  }
}).property();

DS.State = Ember.State.extend({
  isLoaded: stateProperty,
  isDirty: stateProperty,
  isSaving: stateProperty,
  isDeleted: stateProperty,
  isError: stateProperty,
  isNew: stateProperty,
  isValid: stateProperty
});

var cantLoadData = function() {
  // TODO: get the current state name
  throw "You cannot load data into the store when its associated model is in its current state";
};

var isEmptyObject = function(obj) {
  for (var prop in obj) {
    if (!obj.hasOwnProperty(prop)) { continue; }
    return false;
  }

  return true;
};

var setProperty = function(manager, context) {
  var key = context.key, value = context.value;

  var model = get(manager, 'model'), type = model.constructor;
  var store = get(model, 'store');
  var data = get(model, 'data');

  data[key] = value;

  if (store) { store.hashWasUpdated(type, get(model, 'clientId')); }
};

// several states share extremely common functionality, so we are factoring
// them out into a common class.
var DirtyState = DS.State.extend({
  // these states are virtually identical except that
  // they (thrice) use their states name explicitly.
  //
  // child classes implement stateName.
  stateName: null,
  isDirty: true,
  willLoadData: cantLoadData,

  enter: function(manager) {
    var stateName = get(this, 'stateName'),
        model = get(manager, 'model');

    model.withTransaction(function (t) {
      t.modelBecameDirty(stateName, model);
    });
  },

  exit: function(manager) {
    var stateName = get(this, 'stateName'),
        model = get(manager, 'model');

    this.notifyModel(model);

    model.withTransaction(function (t) {
      t.modelBecameClean(stateName, model);
    });
  },

  setProperty: setProperty,

  willCommit: function(manager) {
    manager.goToState('saving');
  },

  saving: DS.State.extend({
    isSaving: true,

    didUpdate: function(manager) {
      manager.goToState('loaded');
    },

    wasInvalid: function(manager, errors) {
      var model = get(manager, 'model');

      set(model, 'errors', errors);
      manager.goToState('invalid');
    }
  }),

  invalid: DS.State.extend({
    isValid: false,

    setProperty: function(manager, context) {
      setProperty(manager, context);

      var stateName = getPath(this, 'parentState.stateName'),
          model = get(manager, 'model'),
          errors = get(model, 'errors'),
          key = context.key;

      delete errors[key];

      if (isEmptyObject(errors)) {
        manager.goToState(stateName);
      }
    }
  })
});

var states = {
  rootState: Ember.State.create({
    isLoaded: false,
    isDirty: false,
    isSaving: false,
    isDeleted: false,
    isError: false,
    isNew: false,
    isValid: true,

    willLoadData: cantLoadData,

    didCreate: function(manager) {
      manager.goToState('loaded.created');
    },

    empty: DS.State.create({
      loadingData: function(manager) {
        manager.goToState('loading');
      }
    }),

    loading: DS.State.create({
      willLoadData: Ember.K,

      exit: function(manager) {
        var model = get(manager, 'model');
        model.didLoad();
      },

      setData: function(manager, data) {
        var model = get(manager, 'model');

        model.beginPropertyChanges();
        model.set('data', data);

        if (data !== null) {
          manager.goToState('loaded');
        }

        model.endPropertyChanges();
      }
    }),

    loaded: DS.State.create({
      isLoaded: true,

      willLoadData: Ember.K,

      setProperty: function(manager, context) {
        setProperty(manager, context);
        manager.goToState('updated');
      },

      'delete': function(manager) {
        manager.goToState('deleted');
      },

      created: DirtyState.create({
        stateName: 'created',
        isNew: true,

        notifyModel: function(model) {
          model.didCreate();
        }
      }),

      updated: DirtyState.create({
        stateName: 'updated',

        notifyModel: function(model) {
          model.didUpdate();
        }
      })
    }),

    deleted: DS.State.create({
      isDeleted: true,
      isLoaded: true,
      isDirty: true,

      willLoadData: cantLoadData,

      enter: function(manager) {
        var model = get(manager, 'model');
        var store = get(model, 'store');

        if (store) {
          store.removeFromModelArrays(model);
        }

        model.withTransaction(function(t) {
          t.modelBecameDirty('deleted', model);
        });
      },

      willCommit: function(manager) {
        manager.goToState('saving');
      },

      saving: DS.State.create({
        isSaving: true,

        didDelete: function(manager) {
          manager.goToState('saved');
        },

        exit: function(stateManager) {
          var model = get(stateManager, 'model');

          model.withTransaction(function(t) {
            t.modelBecameClean('deleted', model);
          });
        }
      }),

      saved: DS.State.create({
        isDirty: false
      })
    }),

    error: DS.State.create({
      isError: true
    })
  })
};

DS.StateManager = Ember.StateManager.extend({
  model: null,
  initialState: 'rootState',
  states: states
});

var retrieveFromCurrentState = Ember.computed(function(key) {
  return get(getPath(this, 'stateManager.currentState'), key);
}).property('stateManager.currentState').cacheable();

DS.Model = Ember.Object.extend({
  isLoaded: retrieveFromCurrentState,
  isDirty: retrieveFromCurrentState,
  isSaving: retrieveFromCurrentState,
  isDeleted: retrieveFromCurrentState,
  isError: retrieveFromCurrentState,
  isNew: retrieveFromCurrentState,
  isValid: retrieveFromCurrentState,

  clientId: null,

  // because unknownProperty is used, any internal property
  // must be initialized here.
  primaryKey: 'id',
  data: null,
  transaction: null,

  didLoad: Ember.K,
  didUpdate: Ember.K,
  didCreate: Ember.K,

  init: function() {
    var stateManager = DS.StateManager.create({
      model: this
    });

    set(this, 'stateManager', stateManager);
    stateManager.goToState('empty');
  },

  withTransaction: function(fn) {
    var transaction = get(this, 'transaction') || getPath(this, 'store.defaultTransaction');

    if (transaction) { fn(transaction); }
  },

  setData: function(data) {
    var stateManager = get(this, 'stateManager');
    stateManager.send('setData', data);
  },

  setProperty: function(key, value) {
    var stateManager = get(this, 'stateManager');
    stateManager.send('setProperty', { key: key, value: value });
  },

  deleteRecord: function() {
    var stateManager = get(this, 'stateManager');
    stateManager.send('delete');
  },

  destroy: function() {
    this.deleteRecord();
    this._super();
  },

  loadingData: function() {
    var stateManager = get(this, 'stateManager');
    stateManager.send('loadingData');
  },

  willLoadData: function() {
    var stateManager = get(this, 'stateManager');
    stateManager.send('willLoadData');
  },

  willCommit: function() {
    var stateManager = get(this, 'stateManager');
    stateManager.send('willCommit');
  },

  adapterDidUpdate: function() {
    var stateManager = get(this, 'stateManager');
    stateManager.send('didUpdate');
  },

  adapterDidCreate: function() {
    var stateManager = get(this, 'stateManager');
    stateManager.send('didCreate');
  },

  adapterDidDelete: function() {
    var stateManager = get(this, 'stateManager');
    stateManager.send('didDelete');
  },

  wasInvalid: function(errors) {
    var stateManager = get(this, 'stateManager');
    stateManager.send('wasInvalid', errors);
  },

  unknownProperty: function(key) {
    var data = get(this, 'data');

    if (data) {
      return get(data, key);
    }
  },

  setUnknownProperty: function(key, value) {
    var data = get(this, 'data');
    ember_assert("You cannot set a model attribute before its data is loaded.", !!data);

    this.setProperty(key, value);
    return value;
  }
});

DS.Model.reopenClass({
  typeForAssociation: function(association) {
    var type = this.metaForProperty(association).type;
    if (typeof type === 'string') {
      type = getPath(this, type, false) || getPath(window, type);
    }
    return type;
  }
});

DS.attr = function(type, options) {
  var transform = DS.attr.transforms[type];
  var transformFrom = transform.from;
  var transformTo = transform.to;

  return Ember.computed(function(key, value) {
    var data = get(this, 'data');

    key = (options && options.key) ? options.key : key;

    if (value === undefined) {
      if (!data) { return; }

      return transformFrom(data[key]);
    } else {
      ember_assert("You cannot set a model attribute before its data is loaded.", !!data);

      value = transformTo(value);
      this.setProperty(key, value);
      return value;
    }
  }).property('data');
};

var embeddedFindRecord = function(store, type, data, key, one) {
  var association = data ? get(data, key) : one ? null : [];
  if (one) {
    return association ? store.load(type, association).id : null;
  } else {
    return association ? store.loadMany(type, association).ids : [];
  }
};

var referencedFindRecord = function(store, type, data, key, one) {
  return data ? get(data, key) : one ? null : [];
};

var hasAssociation = function(type, options, one) {
  var embedded = options && options.embedded,
    findRecord = embedded ? embeddedFindRecord : referencedFindRecord;

  return Ember.computed(function(key) {
    var data = get(this, 'data'), ids, id, association,
      store = get(this, 'store');

    if (typeof type === 'string') {
      type = getPath(this, type, false) || getPath(window, type);
    }

    key = (options && options.key) ? options.key : key;
    if (one) {
      id = findRecord(store, type, data, key, true);
      association = id ? store.find(type, id) : null;
    } else {
      ids = findRecord(store, type, data, key);
      association = store.findMany(type, ids);
    }

    return association;
  }).property('data').cacheable().meta({ type: type });
};

DS.hasMany = function(type, options) {
  ember_assert("The type passed to DS.hasMany must be defined", !!type);
  return hasAssociation(type, options);
};

DS.hasOne = function(type, options) {
  ember_assert("The type passed to DS.hasOne must be defined", !!type);
  return hasAssociation(type, options, true);
};

DS.attr.transforms = {
  string: {
    from: function(serialized) {
      return Em.none(serialized) ? null : String(serialized);
    },

    to: function(deserialized) {
      return Em.none(deserialized) ? null : String(deserialized);
    }
  },

  integer: {
    from: function(serialized) {
      return Em.none(serialized) ? null : Number(serialized);
    },

    to: function(deserialized) {
      return Em.none(deserialized) ? null : Number(deserialized);
    }
  },

  boolean: {
    from: function(serialized) {
      return Boolean(serialized);
    },

    to: function(deserialized) {
      return Boolean(deserialized);
    }
  },

  date: {
    from: function(serialized) {
      var type = typeof serialized;

      if (type === "string" || type === "number") {
        return new Date(serialized);
      } else if (serialized === null || serialized === undefined) {
        // if the value is not present in the data,
        // return undefined, not null.
        return serialized;
      } else {
        return null;
      }
    },

    to: function(date) {
      if (date instanceof Date) {
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var pad = function(num) {
          return num < 10 ? "0"+num : ""+num;
        };

        var utcYear = date.getUTCFullYear(),
            utcMonth = date.getUTCMonth(),
            utcDayOfMonth = date.getUTCDate(),
            utcDay = date.getUTCDay(),
            utcHours = date.getUTCHours(),
            utcMinutes = date.getUTCMinutes(),
            utcSeconds = date.getUTCSeconds();


        var dayOfWeek = days[utcDay];
        var dayOfMonth = pad(utcDayOfMonth);
        var month = months[utcMonth];

        return dayOfWeek + ", " + dayOfMonth + " " + month + " " + utcYear + " " +
               pad(utcHours) + ":" + pad(utcMinutes) + ":" + pad(utcSeconds) + " GMT";
      } else if (date === undefined) {
        return undefined;
      } else {
        return null;
      }
    }
  }
};

})({});


(function(exports) {
//Copyright (C) 2011 by Living Social, Inc.

//Permission is hereby granted, free of charge, to any person obtaining a copy of
//this software and associated documentation files (the "Software"), to deal in
//the Software without restriction, including without limitation the rights to
//use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
//of the Software, and to permit persons to whom the Software is furnished to do
//so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.
})({});
