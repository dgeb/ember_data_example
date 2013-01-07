App.ContactInListView = Em.View.extend({
  templateName: 'contact_in_list',
  tagName: 'li',
  classNameBindings: 'isActive:active',

  isActive: function() {
    return this.get('content.id') === this.get('controller.activeContactId');
  }.property('controller.activeContactId')
});
