Rails.application.routes.draw do
  resources :plants
  resources :users do
    resources :plants
  end
  root 'application#hello'
end
