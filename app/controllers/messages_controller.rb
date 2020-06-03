class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :find_conversation

  def index
    @messages = @conversation.messages

    if @messages.length > 10
      @over_ten = true
      @messages = @messages[-10..-1]
    end

    if params[:m]
      @over_ten = false
      @messages = @conversation.messages
    end

    @message = @conversation.messages.new
  end

  def create
    @message = @conversation.messages.new(message_params)
    @users = User.all

    if @message.save
      (@users.uniq - [current_user]).each do |user|
        Notification.create(recipient: user, sender: current_user, action: "Message", notifiable: @message)
      end

      redirect_to conversation_messages_path(@conversation)
    end
  end

  def new
    @message = @conversation.messages.new
  end



  private

  def message_params
    params.require(:message).permit(:body, :user_id)
  end

  def find_conversation
    @conversation = Conversation.find(params[:conversation_id])
  end
end
