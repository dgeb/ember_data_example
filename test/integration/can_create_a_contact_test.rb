require "test_helper"

# To be handled correctly by Capybara this spec must end with "Feature Test"
feature "CanCreateAContact Feature Test" do
  scenario "create a contact" do
    visit root_path
    click_on 'Add Contact'
    fill_in 'First name', with: 'Wayne'
    fill_in 'Last name', with: 'Campbell'
    fill_in 'Email', with: 'wayne.campbell@worlds.com'
    fill_in 'Notes', with: 'Party on, Gart !'
    find(:xpath, '//a[text()=" Add a phone number"]').click
    find('div.phone-number input').set('1234567890')
    click_on 'Create'

    wayne_details = page.find('div.contact-details')
    assert wayne_details.has_content?('Wayne Campbell')
    assert wayne_details.has_content?('wayne.campbell@worlds.com')
    assert wayne_details.has_content?('Party on, Gart')
    assert wayne_details.has_content?('1234567890')

  end
end
