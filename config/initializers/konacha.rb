Konacha.configure do |config|
  require 'capybara/poltergeist'

  config.spec_dir    = "test/javascripts"
  config.driver      = :poltergeist
  config.stylesheets = %w(application)
end if defined?(Konacha)