class Product < ApplicationRecord
  belongs_to :user
  has_many_attached :images

  validates :title, :description, :city, :state, :zipcode, presence: true
  validates_length_of :description, :maximum => 2000

  def address
    [city, state, zipcode].compact.join(', ')
  end

  geocoded_by :address
  after_validation :geocode
  after_validation :found_address_presence

  def found_address_presence
    errors.add(:address, 'is not valid') unless latitude.present? && longitude.present?
  end
end
