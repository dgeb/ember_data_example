App = Em.Application.create({
  store: DS.Store.create({
    adapter:  DS.RESTAdapter.create(),
    revision: 5
  })
});
