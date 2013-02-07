require 'test_helper'

class ContactSerializerTest < ActiveSupport::TestCase
  describe ContactSerializer do
    it "should serialize a contact with no phone numbers" do
      joe = contacts(:joe)

      expected = {contact:
                   {id: joe.id,
                    first_name: 'Joe',
                    last_name: 'Blow',
                    email: 'joe@example.com',
                    notes: 'Lousy plumber',
                    phone_numbers: []}}

      assert_equal expected, ContactSerializer.new(joe).as_json
    end

    it "should serialize a contact with phone numbers" do
      dan = contacts(:dan)
      dan_home = phone_numbers(:dan_home)
      dan_mobile = phone_numbers(:dan_mobile)

      expected = {contact:
                   {id: dan.id,
                    first_name: 'Dan',
                    last_name: 'Gebhardt',
                    email: 'dan@example.com',
                    notes: 'Writes sample code without tests :/',
                    phone_numbers: [{
                      id: dan_home.id,
                      contact_id: dan.id,
                      number: '603-555-1212'
                    }, {
                      id: dan_mobile.id,
                      contact_id: dan.id,
                      number: '603-555-1234'
                    }]}}

      assert_equal expected, ContactSerializer.new(dan).as_json
    end
  end
end
