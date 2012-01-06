Handlebars.registerHelper('submitButton', function(text) {
  return new Handlebars.SafeString('<button type="submit">' + text + '</button>');
});