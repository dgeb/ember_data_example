EmberDataExample::Application.routes.draw do
  devise_for :users

  root :to => redirect('/contacts')
  resources :contacts
  
end
