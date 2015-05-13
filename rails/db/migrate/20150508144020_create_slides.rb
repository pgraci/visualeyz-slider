class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.string :title
      t.integer :slider_id

      t.timestamps null: false
    end
  end
end
