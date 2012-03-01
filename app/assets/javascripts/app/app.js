App = Em.Application.create();

App.store = DS.Store.create({
  adapter:  DS.RESTAdapter.create({bulkCommit: false}),
  revision: 2
});

App.displayError = function(e) {
  if (typeof e === 'string') {
    // display error strings
    alert(e);
  }
  else if (typeof e === 'object' && e.responseText !== undefined) {
    // TODO - further process json errors
    alert(e.responseText);
  }
  else {
    alert("An unexpected error occurred.");
  }
};
