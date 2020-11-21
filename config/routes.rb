Rails.application.routes.draw do
  root to: 'tasks#index'

  namespace :api do
    namespace :v1 do
      resources :users, param: :email
      resources :projects, only: [:create, :destroy]
    end
  end
  # devise_for :users
  # get '/tasks', to: 'tasks#index'
  get '*path', to: 'tasks#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
