# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, :controllers => {
    omniauth_callbacks: "users/omniauth_callbacks",
    sessions: "users/sessions",
    registrations: "users/registrations"
  }
  resources :products

  resources :conversations do
    resources :messages
  end

  resources :notifications do
    collection do
      post :mark_as_read
    end
  end

  get '/auth/facebook/callback' => 'sessions#create'
  get '/*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
  root to: 'pages#index'
end
