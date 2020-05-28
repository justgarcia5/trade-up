class ProductsController < ApplicationController
  before_action :authenticate_user!, except: %i[index show]
  before_action :find_product, only: %i[edit update destroy show]

  def index
    @products = Product.all
  end

  def new
    @product = Product.new
  end

  def create
    @product = current_user.products.build(product_params)

    if @product.save
      redirect_to root_path
      flash[:notice] = 'Product has been successfully created'
    else
      render :new
    end
  end

  def edit; end

  def show
    @user_product = User.find(@product.user_id)
    @user_image = @user_product.images
    @geo_url = "http://maps.googleapis.com/maps/api/staticmap?size=420x330&sensor=false&zoom=15&markers=#{@product.latitude}%2C#{@product.longitude}&key=AIzaSyA9baOX0VI4bMeZC2YUGFNs0ffcVg30hKc"
  end

  def update
    if @product.update(product_params)
      redirect_to product_path
      flash[:notice] = 'Product has been successfully updated'
    else
      render :edit
    end
  end

  def destroy
    return unless @product.destroy

    redirect_to root_path
    flash[:notice] = 'Product was successfully deleted'
  end

  private

  def find_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:title, :description, :city, :state, :zipcode, images: [])
  end
end
