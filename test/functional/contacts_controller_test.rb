require 'test_helper'

class ContactsControllerTest < ActionController::TestCase
  setup do
    @contact = contacts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:contacts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create contact" do
    assert_difference('Contact.count') do
      post :create, contact: @contact.attributes
    end

    assert_redirected_to contact_path(assigns(:contact))
  end

  test "should show contact" do
    get :show, id: @contact.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @contact.to_param
    assert_response :success
  end

  test "should update contact" do
    put :update, id: @contact.to_param, contact: @contact.attributes
    assert_redirected_to contact_path(assigns(:contact))
  end

  test "should destroy contact" do
    assert_difference('Contact.count', -1) do
      delete :destroy, id: @contact.to_param
    end

    assert_redirected_to contacts_path
  end
end
