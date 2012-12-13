App.Hobby  = DS.Model.extend({
  title:   DS.attr('string'),

  contact: DS.belongsTo('App.Contact')
})

