class AddImageToPlants < ActiveRecord::Migration[5.2]
  def change
    add_column :plants, :plant_image, :string
  end
end
