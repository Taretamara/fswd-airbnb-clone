json.my_bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.property_name booking.property.name  
    json.property_address booking.property.address 
    json.paid booking.paid                     
    json.user_name booking.user.name           
    json.created_at booking.created_at
    json.updated_at booking.updated_at
  end
end
