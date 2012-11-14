class AddUserIdToContact < ActiveRecord::Migration
  def change
    add_column :contacts, :user_id, :integer
  end
end