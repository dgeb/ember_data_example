require 'test_helper'

class ContactsControllerTest < ActionController::TestCase
  describe ContactsController do
    setup do
      @contact = contacts(:dan)
    end

    it "should get index" do
      get :index
      assert_response :success
    end

    it "should create a contact with just a name" do
      assert_difference('Contact.count') do
        post :create,
             contact: {first_name: 'Test',
                       last_name: 'Case'}
      end
    end

    it "should create a contact with a name and phone numbers" do
      assert_difference('Contact.count') do
        assert_difference('PhoneNumber.count', 2) do
          post :create,
               contact: {first_name: 'Test',
                         last_name: 'Case',
                         phone_numbers: [{number: '555-1212'},
                                         {number: '555-1234'}]}
        end
      end
    end

    it "should show contact" do
      get :show, id: @contact.to_param
      assert_response :success
    end

    it "should update contact" do
      assert_equal 2, @contact.phone_numbers.length

      put :update, id: @contact.to_param, contact: @contact.attributes
      assert_response :success

      assert_equal 2, @contact.phone_numbers.length
    end

    it "should destroy contact" do
      assert_difference('Contact.count', -1) do
        delete :destroy, id: @contact.to_param
      end
    end
  end
end
