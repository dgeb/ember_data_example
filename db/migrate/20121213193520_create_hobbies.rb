class CreateHobbies < ActiveRecord::Migration
  def change
    create_table :hobbies do |t|
      t.string :title
      t.references :contact

      t.timestamps
    end
    add_index :hobbies, :contact_id
  end
end
