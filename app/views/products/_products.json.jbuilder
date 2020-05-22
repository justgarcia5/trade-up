json.extract! product, :id, :title, :details, :image, :created_at, :updated_at
json.image_url url_for(product.image) if product.image.attached?
json.url product_url(product, format: :json)
