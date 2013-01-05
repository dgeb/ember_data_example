EmberDataExample::Application.routes.draw do
  scope ":api" do
    resources :contacts
  end
  root :to => 'contacts#index'
  match "/*path" => "contacts#index"
end
