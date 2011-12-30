Handlebars.registerHelper('highlight', function(property) {
  var value = Em.getPath(this, property);
  return new Handlebars.SafeString('<span class="highlight">'+value+'</span>');
});

Handlebars.registerHelper('link', function(text) {
  return new Handlebars.SafeString('<a href="#">'+text+'</a>');
});