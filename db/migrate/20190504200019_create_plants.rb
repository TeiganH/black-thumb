class CreatePlants < ActiveRecord::Migration[5.2]
  def change
    create_table :plants do |t|
      t.string :scientific_name
      t.string :name
      t.integer :user_id

      t.timestamps
    end
  end
end
