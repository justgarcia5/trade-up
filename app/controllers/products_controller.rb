# frozen_string_literal: true

class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.create!(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to root_path }
        format.json { render 'pages/index', status: :created, location: @products }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def product_params
    params.require(:product).permit(:title, :details, :image)
  end
end
