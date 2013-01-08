App.Router.map(function(match) {
  match('/').to('index');
  match('/contacts').to('contacts', function(match) {
    match('/').to('contactsIndex');
    match('/new').to('newContact');
    match('/:contact_id').to('contact');
    match('/:contact_id/edit').to('editContact');
  });
});
