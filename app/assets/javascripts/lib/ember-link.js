Ember.Link = Ember.View.extend(Ember.TargetActionSupport, {
  classNames:        ['ember-link'],
  tagName:           'a',
  attributeBindings: ['href'],
  href:              '#',
  target:            'parentView',
  propagateEvents:   false,

  click: function(evt) {
    evt.preventDefault();
    this.triggerAction();
    return Ember.get(this, 'propagateEvents');
  }
});
