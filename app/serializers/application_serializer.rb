class ApplicationSerializer < ActiveModel::Serializer
  embed :ids, :include => false
end
