Rails.application.routes.draw do
  resources :fields, only: [:index]
  resources :crops, only: [:index]
  resources :humus, only: [:update]
end
