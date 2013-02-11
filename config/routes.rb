EmberDataExample::Application.routes.draw do
  resources :contacts
  root :to => 'application#index'
  match '/*path' => 'application#index'
end
