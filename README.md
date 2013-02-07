# Ember Data Example

This is a simple Rails 3.2 app created to demo [Ember.js](https://github.com/emberjs/ember.js),
[Ember-Data](https://github.com/emberjs/data) and
[Active Model Serializers](https://github.com/rails-api/active_model_serializers).
It uses the edge versions of Ember and Ember Data.

The app itself is a simple, single-page contact manager styled with Twitter Bootstrap.

![Screen shot](https://raw.github.com/dgeb/ember_data_example/master/doc/ss.png)

## Installation

Assuming Ruby 1.9.2+ with bundler gem installed:

    $ bundle install
    $ bundle exec rake db:migrate
    $ rails s

## Test

### Rails

MiniTest::Unit is used for testing the Rails application. To invoke tests:

    $ bundle exec rake test

### Ember

The [konacha](https://github.com/jfirebaugh/konacha) test framework is used for testing the Ember application.
To invoke the tests from the command line:

    $ bundle exec rake konacha:run

To debug and run the tests in the browser, invoke:

    $ bundle exec rake konacha:serve

... and then navigate to [http://localhost:3500](http://localhost:3500).

## Contributions Welcome :)

Please help improve this example by filing issues and pull requests!

## License

Copyright 2012 Dan Gebhardt. MIT License (see LICENSE for details).
