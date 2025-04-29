module Api
  class BookingsController < ApplicationController
    before_action :set_session, only: [:my_bookings, :property_bookings, :create]

    def create
      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      begin
        @booking = Booking.create({ user_id: @session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      @bookings = property.bookings.where("end_date > ?", Date.today)
      render 'api/bookings/index'
    end

    def my_bookings
      @bookings = @session.user.bookings.includes(:property)
      render 'api/bookings/my_bookings'
    end
    
    def property_bookings
      @bookings = Booking.joins(:property)
                         .where(properties: { user_id: @session.user.id })
                         .where("end_date > ?", Date.today)
                         .includes(:user)
      render 'api/bookings/property_bookings'
    end

    private

    def set_session
      token = cookies.signed[:airbnb_session_token]
      @session = Session.find_by(token: token)
      render json: { error: 'user not logged in' }, status: :unauthorized unless @session
    end

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end
