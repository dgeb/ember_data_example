class ContactsController < ApplicationController
  # GET /contacts
  # GET /contacts.json
  def index
    contacts = Contact.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: contacts }
    end
  end

  # GET /contacts/1.json
  def show
    contact = Contact.find(params[:id])
    render json: contact
  end

  # POST /contacts.json
  def create
    contact = Contact.new(params[:contact])
    if contact.save
      render json: contact, status: :created
    else
      render json: contact.errors, status: :unprocessable_entity
    end
  end

  # PUT /contacts/1.json
  def update
    contact = Contact.find(params[:id])

    if contact.update_attributes(params[:contact])
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
end
