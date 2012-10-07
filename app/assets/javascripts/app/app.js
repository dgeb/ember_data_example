App = Em.Application.create({});
App.Store = DS.Store.extend({
    adapter:  DS.RESTAdapter.create(),
    revision: 6
});
