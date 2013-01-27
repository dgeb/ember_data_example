App.ContactsNewView = Ember.View.extend({
  didInsertElement: function() {
    this.$('input:first').focus();
  }
});
