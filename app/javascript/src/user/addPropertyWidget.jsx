import React from 'react';
import { safeCredentialsForm, handleErrors } from '@utils/fetchHelper';
//need to add pictures

class AddPropertyWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      city: '',
      country: '',
      type: '',
      price: '',
      maxGuests: '',
      bedrooms: '',
      beds: '',
      baths: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitProperty = this.submitProperty.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitProperty() {
    let formData = new FormData();
    const fileInputElement = document.getElementById('image-select');
    for (let i = 0; i < fileInputElement.files.length; i++) {
      formData.append('property[images][]', fileInputElement.files[i]);
    }
    // Set other params in the form data.
    formData.set('property[title]', this.state.title);
    formData.set('property[description]', this.state.description);
    formData.set('property[city]', this.state.city);
    formData.set('property[country]', this.state.country);
    formData.set('property[property_type]', this.state.type);
    formData.set('property[price_per_night]', this.state.price);
    formData.set('property[max_guests]', this.state.maxGuests);
    formData.set('property[bedrooms]', this.state.bedrooms);
    formData.set('property[beds]', this.state.beds);
    formData.set('property[baths]', this.state.baths);

    fetch('/api/properties', safeCredentialsForm ({
      method: 'POST',
      body: formData,
    }))
    .then(handleErrors)
    .then(data => {
      if (data.properties) {
        console.log(data);
      }
    });
  };

  render() {
    const { title, description, city, country, type, price, maxGuests, bedrooms, beds, baths} = this.state;

    return (
      <React.Fragment>
        <div className="border rounded shadow-sm p-4 mb-4">
          <h4 className=" mb-3 d-inline-block">New Property</h4>
          <div className="float-end d-inline-block">
            <button type="cancel" className="btn btn-large btn-danger btn-block " onClick={this.props.toggle}>Cancel</button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); this.submitProperty(); this.props.toggle(); }}>
            <input type="text" name="title" className="form-control mb-3" placeholder="Property title" value={title} onChange={this.handleChange} required/>
            <input type="text" name="description" className="form-control mb-3" placeholder="Property description" value={description} onChange={this.handleChange} required />
            <hr />
            <h6>Property Location</h6>
            <input type="text" name="city" className="form-control mb-3" placeholder="City" value={city} onChange={this.handleChange} required />
            <input type="text" name="country" className="form-control mb-3" placeholder="Country" value={country} onChange={this.handleChange} required />
            <hr />
            <h6>Property Details</h6>
            <select id="propertyType" name="type" className="form-control mb-3" value={type} onChange={this.handleChange} required >
              <option value="" disabled>Select your property type</option>
              <option value="studio">Studio</option>
              <option value="room in hotel">Room in hotel</option>
              <option value="private room in apartment">Private room in apartment</option>
              <option value="entire apartment">Entire apartment</option>
              <option value="entire condominium">Entire condominium</option>
              <option value="entire house">Entire house</option>
            </select>
            <div className="input-group  mb-3">
              <span className="input-group-text">$</span>
              <input type="number" id="price" name="price" className="form-control" value={price} onChange={this.handleChange} placeholder="Nightly Rate" required />
            </div>
            <input type="number" name="maxGuests" id="guests" className="form-control mb-3" value={maxGuests} onChange={this.handleChange} placeholder="Max Guests" required />
            <input type="number" name="bedrooms" id="bedrooms" className="form-control mb-3" value={bedrooms} onChange={this.handleChange} placeholder="Number of Bedrooms" required />
            <input type="number" name="beds" id="beds" className="form-control mb-3" value={beds} onChange={this.handleChange} placeholder="Number of Beds" required />
            <input type="number" name="baths" id="baths" className="form-control mb-3" value={baths} onChange={this.handleChange} placeholder="Number of Baths" required />
            <label className="me-2">Property Image:</label>
            <input type="file" id="image-select" name="image" accept="image/*" onChange={this.handleChange}/>
            <div className="float-end d-inline-block">
              <button type="submit" className="btn btn-large btn-danger btn-block">Add</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddPropertyWidget;
