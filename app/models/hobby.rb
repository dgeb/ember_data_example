class Hobby < ActiveRecord::Base
  belongs_to :contact
  attr_accessible :title
end
