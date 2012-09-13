App.EditContactView = Ember.View.extend({
  tagName: 'form',
  templateName: 'app/templates/edit_contact',

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  submit: function(event) {
    event.preventDefault();
    this.get('controller').updateRecord();
  }
});