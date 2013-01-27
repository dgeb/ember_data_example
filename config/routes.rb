EmberDataExample::Application.routes.draw do
  resources :contacts
  root :to => 'contacts#index'
  match "/*path" => "contacts#index"
end
