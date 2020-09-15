# frozen_string_literal: true

module ApplicationHelper

  def user_avatar(user_id)
    user = User.find(user_id)
    if user.avatar.attached?
      user.avatar
    elsif user.image.present?
      user.image
    else
      "https://ptetutorials.com/images/user-profile.png"
    end
  end

end
