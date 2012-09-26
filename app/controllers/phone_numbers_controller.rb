class PhoneNumbersController < ApplicationController
  def index
    render json: PhoneNumber.where('id IN (?)', params[:ids]), status: :ok
  end

  def show
    
  end

  def create
    phone_number = PhoneNumber.create(params[:phone_number])
    if phone_number.save
      render json: phone_number, status: :created
    else
      render json: phone_number.errors, status: :unprocessable_entity
    end
  end

  def update
    render json: PhoneNumber.find(params[:id]).update_attributes(params[:phone_number]), status: :ok
  end

  def destroy
    phone_number = PhoneNumber.find(params[:id])
    phone_number.destroy
    render json: nil, status: :ok
  end
end
