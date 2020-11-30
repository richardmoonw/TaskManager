Rails.application.routes.draw do
  root to: 'tasks#index'

  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:create]
      resources :registrations, only: [:create]
      resources :projects
      resources :employees
      resources :tickets
      resources :comments
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
      root to: 'tasks#index'
    end
  end

  get '*path', to: 'tasks#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
