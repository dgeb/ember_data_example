require 'sprockets/handlebars_template'

Rails.application.assets.register_engine 'hjs', HandlebarsTemplate
