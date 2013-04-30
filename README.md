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

### Integration

Capybara is used for integration testing. By default, the `poltergeist` driver is used, although `selenium` could be used as well.
To change drivers, update the following line in `test_helper.rb`:

    Capybara.default_driver = :selenium

Integration tests are performed by default when running `bundle exec rake test`. You can *just* run integration tests with:

    $ bundle exec rake test:integration

### Ember

The [konacha](https://github.com/jfirebaugh/konacha) test framework is used for testing the Ember application.
To invoke the tests from the command line:

    $ bundle exec rake konacha:run

To debug and run the tests in the browser, invoke:

    $ bundle exec rake konacha:serve

... and then navigate to [http://localhost:3500](http://localhost:3500).

## Contributions Welcome :)

Please help improve this example by filing issues and pull requests!

## Variations

[Chandu Tennety](https://github.com/tennety) is maintaining a
[fork of this project](https://github.com/tennety/ember_data_example) that uses
[Emblem.js](http://emblemjs.com/) templates.

## License

Copyright 2012 Dan Gebhardt. MIT License (see LICENSE for details).
