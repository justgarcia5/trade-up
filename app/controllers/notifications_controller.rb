class NotificationsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    @notifications = Notification.where(recipient: current_user).unread
    @notifications.each do |notification|
      @messages = Message.where(user_id: notification.sender)
    end
    @messages.each do |message|
      @conversation = Conversation.where(id: message)
    end
  end

  def mark_as_read
    @notifications = Notification.where(recipient: current_user).unread
    @notifications.update_all(read_at: Time.zone.now)
    render json: {success: true}
  end

end
