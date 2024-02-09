import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class AddPropertyWidget extends React.Component {
  state = {
    authenticated: false,
    
  }

  const submitProperty = (event) => {
    event.preventDefault();

    const [title, getTitle] = useState('');
    const [description, getDescription] = useState('');
    const [city, getCity] = useState('');
    const [country, getCountry] = useState('');
    const [type, getType] = useState('');
    const [price, getPrice] = useState('');
    const [maxGuests, getMaxGuests] = useState('');
    const [bedrooms, getBedrooms] = useState('');
    const [beds, getBeds] = useState('');
    const [baths, getBaths] = useState('');

    fetch('/api/properties', safeCredentials ({
      method: 'POST',
      body: JSON.stringify({
        property: {
          title: title,
          description: description,
          city: city,
          country: country,
          property_type: type,
          price_per_night: price,
          max_guests: maxGuests,
          bedrooms: bedrooms,
          beds: beds,
          baths: baths,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        refreshFeed();
      })
  };

render () {
  const { authenticated } = this.state;
  if (!authenticated) {
    return (
      <div className="border p-4 mb-4">
        Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make add a property.
      </div>
    );
  };


  return (
    <div className="border p-4 mb-4">
      <form onSubmit={submitProperty}>
       <input type="text" placeholder="Property title" onChange={(event) => getTitle(event.target.value)}></input>
        <input type="text" placeholder="Property description" onChange={(event) => getDescription(event.target.value)}></input>
        <hr />
        <h5>Property Location</h5>
        <input type="text" placeholder="City" onChange={(event) => getCity(event.target.value)}></input>
        <input type="text" placeholder="Country" onChange={(event) => getCountry(event.target.value)}></input>
        <hr />
        <label for="propertyType">Select Your Property Type</label>
        <select id="propertyType" onChange={(event) => getType(event.target.value)}>
          <option value="" disabled selected>Select your property type</option>
          <option value="studio">Studio</option>
          <option value="room in hotel">Room in hotel</option>
          <option value="private room in apartment">Private room in apartment</option>
          <option value="entire apartment">Entire apartment</option>
          <option value="entire condiminium">Entire condiminimum</option>
          <option value="entire house">Entire house</option>
        </select>
        <label for="price" onChange={(event) => getPrice(event.target.value)}>Price per night:</label><input type="number" id="price"></input>
        <label for="guests" onChange={(event) => getMaxGuests(event.target.value)}>Max number of guests:</label><input type="number" id="guests"></input>
        <label for="bedrooms" onChange={(event) => getBedrooms(event.target.value)}>Number of bedrooms:</label><input type="number" id="bedrooms"></input>
        <label for="beds" onChange={(event) => getBeds(event.target.value)}>Number of beds:</label><input type="number" id="beds"></input>
        <label for="baths" onChange={(event) => getBaths(event.target.value)}>Number of bathrooms:</label><input type="number" id="baths"></input>
        // add picture upload here
        <button type="submit" className="btn btn-large btn-danger btn-block">Add</button>
      </form>
    </div>
  )
}
}
export default AddPropertyWidget;
