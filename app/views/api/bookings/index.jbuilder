json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.name booking.user.username
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.price_per_night booking.property.price_per_night
    json.is_paid booking.is_paid?
  end
end