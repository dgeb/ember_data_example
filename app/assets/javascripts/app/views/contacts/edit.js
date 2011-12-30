App.EditContactView = Em.View.extend({
  templateName: 'app/templates/contacts/edit',
  tagName: 'form',

  submit: function(evt) {
    evt.preventDefault();

    var contact = this.get("contact");
    contact.set("firstName", this.$().find("#firstName").val());
    contact.set("lastName", this.$().find("#lastName").val());
    App.store.commit();

    // hide edit form
    this.showView.stopEditing();

    // prevent event from bubbling up
    return false;
  }
});