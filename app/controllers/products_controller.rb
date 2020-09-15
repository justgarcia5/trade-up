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
      redirect_to new_product_path
      flash[:errors] = @product.errors.full_messages
    end
  end

  def edit; end

  def show
    @user = User.find(@product.user_id)
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
