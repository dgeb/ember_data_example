App.EditContactView = Em.View.extend({
  templateName: 'app/templates/contacts/edit',
  tagName: 'form',

  submit: function(evt) {
    evt.preventDefault();

    var contact = this.get("contact");
    contact.set("first_name", this.$().find("#first_name").val());
    contact.set("last_name", this.$().find("#last_name").val());
    App.store.commit();

    // hide edit form
    this.showView.stopEditing();

    // prevent event from bubbling up
    return false;
  }
});