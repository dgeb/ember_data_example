class CreatePhoneNumbers < ActiveRecord::Migration
  def change
    create_table :phone_numbers do |t|
      t.string     :number
      t.references :contact
      
      t.timestamps
    end
  end
end
