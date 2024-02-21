json.booking do
    json.id @booking.id
    json.start_date @booking.start_date
    json.end_date @booking.end_date
    json.title @booking.property.title
    json.image @booking.property.image_url
    json.description @booking.property.description
  end
