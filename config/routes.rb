EmberDataExample::Application.routes.draw do
  root :to => 'contacts#index'
  resources :contacts
  resources :phone_numbers
end
