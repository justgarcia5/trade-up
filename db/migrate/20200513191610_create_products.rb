# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title
      t.string :category
      t.text :description
      t.text :city
      t.text :state
      t.text :zipcode
      t.decimal :price, precision: 5, scale: 2

      t.timestamps
    end
  end
end
