Handlebars.registerHelper('highlight', function(property) {
  var value = Em.getPath(this, property);
  return new Handlebars.SafeString('<span class="highlight">'+value+'</span>');
});
