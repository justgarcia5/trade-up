class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :user
  has_many :notifications
  validates_presence_of :body, :conversation_id, :user_id

  def message_time
    time = created_at.strftime("%m/%d/%y at %l:%M %p")
  end
end
