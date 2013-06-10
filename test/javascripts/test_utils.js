var lookupStore = function() {
  return App.__container__.lookup('store:main');
};

var lookupRouter = function() {
  return App.__container__.lookup('router:main');
};

var lookupController = function(controllerName, options) {
  return App.__container__.lookup('controller:' + controllerName, options);
};

var appendView = function(view) {
  Ember.run(function() {
    view.append('#konacha');
  });
};
