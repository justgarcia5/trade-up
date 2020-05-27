# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title
      t.string :category
      t.text :details
      t.text :location
      t.decimal :price, precision: 5, scale: 2

      t.timestamps
    end
  end
end
