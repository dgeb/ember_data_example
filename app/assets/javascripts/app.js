//= require_self
//= require ./store
//= require_tree ./models
//= require_tree ./controllers
//= require_tree ./views
//= require_tree ./helpers
//= require_tree ./templates
//= require ./router
//= require_tree ./routes

App = Em.Application.create({LOG_TRANSITIONS: true});

// Defer App readiness until it should be advanced for either
// testing or production.
App.deferReadiness();
