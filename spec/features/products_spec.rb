# frozen_string_literal: true

require 'spec_helper'
require 'rails_helper'
require 'capybara/rspec'

feature 'User navigates to a new product product form and creates product' do
  scenario 'clicks trade button' do
    visit products_path
    click_link 'trade'
    visit new_product_path
    expect(page).to have_content('New product')
    fill_in 'title', with: 'Some title'
    fill_in 'details', with: 'Some detail'
    click_button 'Submit'
    visit products_path
    expect(page).to have_content('Some title')
  end
end
