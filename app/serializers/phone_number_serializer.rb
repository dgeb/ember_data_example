class PhoneNumberSerializer < ActiveModel::Serializer
  attributes :id, :number, :contact_id
end