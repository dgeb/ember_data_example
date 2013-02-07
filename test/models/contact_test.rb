require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  describe Contact do
    before do
      @contact = contacts(:dan)
    end

    it "has a full_name, concatenated from first_name and last_name" do
       assert_equal 'Dan Gebhardt', @contact.full_name
    end
  end
end
