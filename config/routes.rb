# frozen_string_literal: true

Rails.application.routes.draw do
  resources :products

  get '/*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
  root to: 'pages#index'
end
