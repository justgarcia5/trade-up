# frozen_string_literal: true

module ProductsHelper

  def google_map(lat, long)
    "https://maps.googleapis.com/maps/api/staticmap?size=420x330&sensor=false&zoom=14&markers=#{lat}%2C#{long}&key=AIzaSyA9baOX0VI4bMeZC2YUGFNs0ffcVg30hKc"
  end

end
