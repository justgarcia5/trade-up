# frozen_string_literal: true

module ConversationsHelper

  def conversation_last_message(id)
    messages = Message.where(conversation_id: id)
    messages.last
  end

end