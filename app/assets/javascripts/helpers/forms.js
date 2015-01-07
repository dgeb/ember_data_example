Ember.Handlebars.registerHelper('submitButton', function(text) {
  return new Handlebars.SafeString('<button type="submit" class="btn btn-primary">' + text + '</button>');
});

Ember.Handlebars.helper('mailto', function(address) {
  if (address) {
    return new Handlebars.SafeString('<a href="mailto:' + address + '" />' + address + '</a>');
  }
});
