# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, :controllers => { 
    omniauth_callbacks: "users/omniauth_callbacks",
    sessions: "users/sessions",
    registrations: "users/registrations"
  }
  resources :products
  get '/auth/facebook/callback' => 'sessions#create'
  get '/my-products', to: 'pages#my-products'
  get '/*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
  root to: 'pages#index'
end
