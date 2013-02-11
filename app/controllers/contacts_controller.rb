class ContactsController < ApplicationController
  # GET /contacts.json
  def index
    render json: Contact.all
  end

  # GET /contacts/1.json
  def show
    contact = Contact.find(params[:id])
    render json: contact
  end

  # POST /contacts.json
  def create
    contact = Contact.new
    if update_contact(contact)
      render json: contact, status: :created
    else
      render json: contact.errors, status: :unprocessable_entity
    end
  end

  # PUT /contacts/1.json
  def update
    contact = Contact.find(params[:id])
    if update_contact(contact)
      render json: contact, status: :ok
    else
      render json: contact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contacts/1.json
  def destroy
    contact = Contact.find(params[:id])
    contact.destroy
    render json: nil, status: :ok
  end

private

  def permitted_params
    params.require(:contact).permit(:first_name,
                                    :last_name,
                                    :email,
                                    phone_numbers: [:id, :number])
  end

  def update_contact(contact)
    contact_params = permitted_params
    phone_numbers_param = contact_params.extract!(:phone_numbers)
    phone_numbers_param = phone_numbers_param[:phone_numbers]
    phone_numbers_param ||= []

    # Because updates to the contact and its associations should be atomic,
    # wrap them in a transaction.
    Contact.transaction do
      # Update the contact's own attributes first.
      contact.attributes = contact_params
      contact.save!

      # Update the contact's phone numbers, creating/destroying as appropriate.
      specified_phone_numbers = []
      phone_numbers_param.each do |phone_number_params|
        if phone_number_params[:id]
          pn = contact.phone_numbers.find(phone_number_params[:id])
          pn.update_attributes(phone_number_params)
        else
          pn = contact.phone_numbers.create(phone_number_params)
        end
        specified_phone_numbers << pn
      end
      contact.phone_numbers.each do |pn|
        pn.destroy unless specified_phone_numbers.include?(pn)
      end
    end

    # Important! Reload the contact to ensure that changes to its associations
    # (i.e. phone numbers) will be serialized correctly.
    contact.reload

    return true
  rescue
    return false
  end
end
