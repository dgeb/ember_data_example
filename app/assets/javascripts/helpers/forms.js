Handlebars.registerHelper('submitButton', function(text) {
  return new Handlebars.SafeString('<button type="submit" class="btn btn-primary">' + text + '</button>');
});

Handlebars.registerHelper('mailto', function(field) {
  var address = this.get(field);
  if (address) {
    return new Handlebars.SafeString('<a href="mailto: ' + address + '" />' + address + '</a>');
  }
});