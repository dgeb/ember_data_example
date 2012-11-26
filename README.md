# Ember Data Example

This is a simple Rails 3.2 app created to demo [Ember.js](https://github.com/emberjs/ember.js),
[Ember-Data](https://github.com/emberjs/data) and
[Active Model Serializers](https://github.com/rails-api/active_model_serializers).
It uses the edge versions of Ember (post 1.0.pre) and Ember Data (after the merge of the relationship-improvements branch),
and therefore may be unstable.

The app itself is a simple, single-page contact manager styled with Twitter Bootstrap.

![Screen shot](https://raw.github.com/dgeb/ember_data_example/master/doc/ss.png)

## Installation

Assuming Ruby 1.9.2+ with bundler gem installed:

    $ bundle install
    $ bundle exec rake db:migrate
    $ rails s

## Contributions Welcome :)

Please help improve this example by filing issues and pull requests!

## License

Copyright 2012 Dan Gebhardt. MIT License (see LICENSE for details).
