class PhoneNumber < ActiveRecord::Base
  belongs_to :contact
  attr_accessible :number, :contact_id
end
