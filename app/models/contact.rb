class Contact < ActiveRecord::Base
  validates :first_name, :presence => true
  validates :last_name, :presence => true
  has_many :phone_numbers, :dependent => :destroy

  def full_name
    self.first_name + ' ' + self.last_name
  end
end
