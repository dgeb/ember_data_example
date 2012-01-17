# Ember Data Example

This is a simple Rails 3.1 app created to try out Ember.js and the Data library recently created by the Ember.js team:
https://github.com/emberjs/data

The app itself is a single-page Ember.js take on Rails CRUD scaffolding. It is one of several similar examples I'm creating
to try out Ember.js and different persistence strategies.

## Installation

Assuming Ruby 1.9.2+ with bundler gem installed:

    $ bundle install
    $ bundle exec rake db:migrate
    $ rails s

## Notes

This example uses the default adapter included with Ember Data, which doesn't include error handling.

The contact listing is initially loaded from data embedded in the html to improve performance (see `app/views/contacts/index.html.erb`).

Please help improve this example by filing issues and pull requests!

## License

Copyright 2012 Dan Gebhardt. MIT License (see LICENSE for details).
