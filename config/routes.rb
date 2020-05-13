# frozen_string_literal: true

Rails.application.routes.draw do
  resources :products

  root to: 'home#index'
end
