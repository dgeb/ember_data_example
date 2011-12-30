# Ember Data Example

This is a simple Rails 3.1 app created to try out Ember.js and the Data library recently created by the Ember.js team:
https://github.com/emberjs/data

This is one of several similar examples I'm using to try out different persistence strategies with Ember.js.
I am new to Ember.js and will be using these examples to figure out the library. Corrections and suggestions are quite welcome.

## Notes

A custom adapter (`DS.restAdapter`) was written for communicating with a REST data source. This adapter is very alpha.
It does not include error handling, as it's unclear how this should be integrated into Ember Data adapters in general.

The contact listing is initially loaded from data embedded in the html to improve performance (see views/contacts/index.html.erb).

This initial version is quite buggy. Please help improve it by filing issues and pull requests!
