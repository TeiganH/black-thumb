Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  resources :plants
  resources :users do
    resources :plants
  end
  root 'application#hello'
end
