json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.title booking.property.title
    json.price_per_night booking.property.price_per_night
  end
end