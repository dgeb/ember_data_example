class ContactSerializer < ActiveModel::Serializer
  attributes :id,
             :first_name,
             :last_name,
             :email,
             :notes
  has_many :hobbies
end
