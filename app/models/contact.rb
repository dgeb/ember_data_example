class Contact < ActiveRecord::Base
  validates :first_name, :presence => true
  validates :last_name, :presence => true
  has_many :phone_numbers, :dependent => :destroy
end
