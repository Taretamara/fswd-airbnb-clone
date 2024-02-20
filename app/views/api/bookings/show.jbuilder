json.booking do
    json.id @booking.id
    json.start_date @booking.start_date
    json.end_date @booking.end_date
    json.title @booking.property.title
  end
