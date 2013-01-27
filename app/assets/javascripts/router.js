App.Router.map(function() {
  this.resource('contacts', function() {
    this.route('new');
    this.resource('contact', {path: ':contact_id'});
  });
});
