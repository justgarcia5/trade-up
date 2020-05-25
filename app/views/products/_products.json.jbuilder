json.extract! product, :id, :title, :details, :image, :created_at, :updated_at
if product.image.attached?
  json.image_url url_for(product.image)
end
json.url product_url(product, format: :json)
