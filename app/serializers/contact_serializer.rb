class ContactSerializer < ApplicationSerializer
  attributes :id,
             :first_name,
             :last_name,
             :email,
             :notes

  has_many :phone_numbers
end
