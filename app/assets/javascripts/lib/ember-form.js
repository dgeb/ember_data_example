Ember.Form = Ember.View.extend(Ember.TargetActionSupport, {
  classNames:      ['ember-form'],
  tagName:         'form',
  target:          '*',            // default target = view itself
  action:          'submitForm',   // default action = submitForm()
  propagateEvents: false,

  // trigger the action bound to this view when the form is submitted
  submit: function(evt) {
    evt.preventDefault();
    this.triggerAction();
    return Ember.get(this, 'propagateEvents');
  },

  // serialize form data as an object
  serialize: function() {
    var data = {},
        a = this.$().serializeArray(),
        o;

    for (var i = 0; i < a.length; i++) {
      o = a[i];
      data[o.name] = o.value;
    }

    return data;
  }
});
