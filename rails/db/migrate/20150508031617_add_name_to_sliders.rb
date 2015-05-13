class AddNameToSliders < ActiveRecord::Migration
  def change
    add_column :sliders, :name, :string
  end
end
