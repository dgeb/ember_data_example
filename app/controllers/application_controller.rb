class ApplicationController < ActionController::Base
  protect_from_forgery
  serialization_scope :current_user
  before_filter :authenticate_user!
end
