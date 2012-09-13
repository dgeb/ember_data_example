class AddContactFields < ActiveRecord::Migration
  def change
    change_table :contacts do |t|
      t.string :email
      t.text :notes
    end
  end
end
