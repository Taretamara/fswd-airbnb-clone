
json.property do
    json.title @property.title
    json.city @property.city
    json.country @property.country
    json.property_type @property.property_type
    json.price_per_night @property.price_per_night
    if @property.images.attached?
    json.images do
      @property.images.each do |image|
        json.url url_for(image)
      end
    end
end