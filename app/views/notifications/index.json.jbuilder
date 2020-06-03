json.array! @notifications do |notification|
  json.id notification.id
  json.sender notification.sender
  json.action notification.action
  json.notifiable do
     notification.notifiable
     json.type "a #{notification.notifiable.class.to_s.underscore.humanize.downcase}"
  end
  json.url conversation_messages_path(notification.sender)
end