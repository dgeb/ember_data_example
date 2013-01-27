App.ContactEditView = Ember.View.extend({
  didInsertElement: function() {
    this.$('input:first').focus();
  }
});
