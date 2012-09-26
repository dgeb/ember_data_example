class CreatePhoneNumbers < ActiveRecord::Migration
  def change
    create_table :phone_numbers do |t|
      t.integer :number
      t.references :contact
      
      t.timestamps
    end
  end
end
