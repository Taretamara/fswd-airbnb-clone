module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @properties

      render 'api/properties/index', status: :ok
    end

    def show_by_user
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      user = session.user if session
      @properties = user.properties.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @properties

      render 'api/properties/show_by_user', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @property

      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @property = user.properties.new(property_params)

      render 'api/properties/create' if @property.save
    end

    def update
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user
      property = Property.find(params[:id])

      if property.update(property_params)
        render 'api/properties/update'
      else
        render json: @property.errors, status: :unprocessable_entity
      end
    end

    def destroy
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user

      return render json: { success: false } unless session

      user = session.user
      property = Property.find_by(id: params[:id])

      if property && (property.user == user) && property.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    def property_params
      params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :user, images:[], )
    end
  end
end
