App.EditContactView = Ember.View.extend({
  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  }
});