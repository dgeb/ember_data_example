//= require test_helper
//= require store

describe("App.Store", function() {
  beforeEach(function(done) {
    store = App.Store.create();
    done();
  });
  afterEach(function() {
    store.destroy();
  });

  it("is a DS.Store", function() {
    assert.ok(App.Store);
    assert.ok(DS.Store.detect(App.Store));
  });

  it("works with latest Ember-Data revision 12", function() {
    assert.equal(store.get('revision'), 12);
  });

  describe("adapter", function() {
    it("is a DS.RESTAdapter", function() {
      assert.ok(DS.RESTAdapter.detectInstance(store.get('adapter')));
    });
    //it("has a namespace 'api'", function() {
    //  assert.ok(store.get('adapter.namespace'), 'api');
    //});
  });
});