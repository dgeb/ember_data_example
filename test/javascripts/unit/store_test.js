//= require test_helper
//= require store

describe("Data: App.Store", function() {
  var store;

  beforeEach(function() {
    store = lookupStore();
  });

  it("works with latest Ember-Data revision", function() {
    assert.equal(store.get('revision'), 12);
  });

  describe("adapter", function() {
    it("is a DS.RESTAdapter", function() {
      assert.ok(DS.RESTAdapter.detectInstance(store.get('adapter')));
    });
  });
});