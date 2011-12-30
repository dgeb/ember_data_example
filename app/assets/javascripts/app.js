App = Em.Application.create();

App.store = DS.Store.create({
  adapter: DS.restAdapter
});
