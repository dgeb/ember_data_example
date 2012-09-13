App.EditContactView = Ember.View.extend({
  templateName: 'app/templates/edit_contact',
  tagName: 'form',
  classNames: 'form-horizontal',

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  submit: function(event) {
    event.preventDefault();
    this.get('controller').updateRecord();
  }
});