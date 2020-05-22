# frozen_string_literal: true

class ProductsController < ApplicationController
  before_action :find_product, only: %i[show edit destroy update]

  def index
    @products = Product.all
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.create!(product_params)

    if @product.save
      redirect_to root_path
      flash[:notice] = 'Product has been successfully created'
    else
      render :new
    end
  end

  def show; end

  def edit; end

  def update
    if @product.update(product_params)
      redirect_to product_path
      flash[:notice] = 'Product has been successfully updated'
    else
      render :show
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
    params.require(:product).permit(:title, :details, :image)
  end
end
