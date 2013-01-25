source 'http://rubygems.org'

gem 'rails', '3.2.9'
gem 'sqlite3'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails'
  gem 'uglifier'
  gem 'anjlab-bootstrap-rails', '>= 2.1', :require => 'bootstrap-rails'
end

gem 'active_model_serializers', github: 'rails-api/active_model_serializers'
gem 'jquery-rails'
# barber included because of https://github.com/emberjs/ember.js/issues/1827#issuecomment-12610866
gem 'barber', git: 'git://github.com/tchak/barber.git'
gem 'ember-rails', github: 'emberjs/ember-rails'

group :test do
  # Pretty printed test output
  gem 'turn', '~> 0.8.3', require: false
end

group :test, :development do
  gem 'konacha'
  gem 'poltergeist'
end