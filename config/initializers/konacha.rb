Konacha.configure do |config|
  require 'capybara/poltergeist'

  config.spec_dir    = "spec/javascripts"
  config.driver      = :poltergeist
  config.stylesheets = %w(application)
end if defined?(Konacha)