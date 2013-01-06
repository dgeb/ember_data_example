App.EditContactController = Em.ObjectController.extend({
  content: null,
  
  exitEditing: function() {
    this.get('transaction').rollback();
    if(this.get('content.id'))
      this.get('target.router').transitionTo('contact', this.get('content'));
    else
      this.get('target.router').transitionTo('contactsIndex');
  },

  updateRecord: function() {
    this.get('store').commit();

    if (this.get('content.isNew')) {
      // when creating new records, it's necessary to wait for the record to be assigned
      // an id before we can transition to its route (which depends on its id)
      this.get('content').addObserver('id', this, 'showRecord');
    } else {
      // when updating records, the id is already known, so we can transition immediately
      this.showRecord();
    }
  },

  showRecord: function() {
    var content = this.get('content');
    content.removeObserver('id', this, 'showRecord');
    this.get('target.router').transitionTo('contact', content);
  }
});
