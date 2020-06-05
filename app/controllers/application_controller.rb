class ApplicationController < ActionController::Base
  before_action :get_messages

  private

  def get_messages
    @messages = Message.all
  end
end
