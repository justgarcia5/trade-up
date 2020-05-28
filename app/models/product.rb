# frozen_string_literal: true

class Product < ApplicationRecord
  belongs_to :user
  has_many_attached :images

  def address
    [city, state, zipcode].compact.join(', ')
  end

  geocoded_by :zipcode
  after_validation :geocode

end
