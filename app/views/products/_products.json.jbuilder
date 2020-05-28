json.extract! product, :id, :title, :description, :images, :city, :state, :zipcode, :user_id, :created_at, :updated_at
if product.images.attached?
  product.images.each do |i|
    json.image_url url_for(i)
  end
end
json.url product_url(product, format: :json)
