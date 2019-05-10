class AddDescriptionToPlant < ActiveRecord::Migration[5.2]
  def change
    add_column :plants, :description, :text
  end
end
