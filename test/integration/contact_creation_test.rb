require "test_helper"

class ContactCreationTest < Capybara::Rails::TestCase
  describe "Adding a new contact" do
    setup do
      visit root_path
      click_on 'Add Contact'
    end

    describe "with valid data" do
      setup do
        fill_in 'First name', with: 'Wayne'
        fill_in 'Last name', with: 'Campbell'
        fill_in 'Email', with: 'wayne.campbell@worlds.com'
        fill_in 'Notes', with: 'Party on, Garth!'
        find(:xpath, '//a[text()=" Add a phone number"]').click
        find('div.phone-number input').set('1234567890')
        click_on 'Create'
      end

      it "should create the record and then show its details" do
        wayne_details = page.find('div.contact-details')
        assert wayne_details.has_content?('Wayne Campbell')
        assert wayne_details.has_content?('wayne.campbell@worlds.com')
        assert wayne_details.has_content?('Party on, Garth')
        assert wayne_details.has_content?('1234567890')
      end
    end
  end
end
