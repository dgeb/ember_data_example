require 'test_helper'

class PhoneNumberSerializerTest < ActiveSupport::TestCase
  describe PhoneNumberSerializer do
    it "should serialize a phone number" do
      dan = contacts(:dan)
      dan_mobile = phone_numbers(:dan_mobile)

      expected = {phone_number:
                   {id: dan_mobile.id,
                    contact_id: dan.id,
                    number: '603-555-1234'}}

      assert_equal expected, PhoneNumberSerializer.new(dan_mobile).as_json
    end
  end
end
