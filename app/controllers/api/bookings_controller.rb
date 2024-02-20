module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      user = session.user if session
      property = user.properties.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      begin
        @booking = user.bookings.create(property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date])

        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      @bookings = property.bookings.where('end_date > ? ', Date.today)
      render 'api/bookings/index'
    end

    def index
      @bookings = Booking.all.order(created_at: :desc)
      render 'api/bookings/index'
    end

    def show
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @booking

      render 'api/bookings/show', status: :ok
    end

    def show_by_user
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      user = session.user if session
      @bookings = user.bookings.order(created_at: :desc)
      return render json: { error: 'not_found' }, status: :not_found unless @bookings

      render 'api/bookings/show_by_user', status: :ok
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date, :property_title, :property_image)
    end
  end
end
