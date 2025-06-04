module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def create
      # Ensure the user is authenticated, you may use a current_user method or session-based check
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      # Create the property using the provided parameters
      @property = Property.new(property_params)

      # Attach images if present (ActiveStorage handles this for us)
      if params[:property][:images].present?
        params[:property][:images].each do |image|
          @property.images.attach(image)
        end
      end

      # Save the property to the database
      if @property.save
        render 'api/properties/show', status: :created
      else
        render json: { error: @property.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def property_params
      params.require(:property).permit(
        :title, :description, :city, :country, :property_type, 
        :price_per_night, :max_guests, :bedrooms, :beds, :baths
      )
    end
  end
end
