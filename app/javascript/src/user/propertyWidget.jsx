import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
//need to add pictures

class PropertyWidget extends React.Component {
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
      propertyId: props.propertyId || null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitProperty = this.submitProperty.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  updateProperty() {
    fetch(`/api/properties/${this.state.propertyId}/update`, safeCredentials ({
      method: 'POST',
      body: JSON.stringify({
        property: {
          title: this.state.title,
          description: this.state.description,
          city: this.state.city,
          country: this.state.country,
          property_type: this.state.type,
          price_per_night: this.state.price,
          max_guests: this.state.maxGuests,
          bedrooms: this.state.bedrooms,
          beds: this.state.beds,
          baths: this.state.baths,
        }
      })
    }))
    .then(handleErrors)
    .then(data => {
      if (data.properties) {
        console.log(data);
        this.props.toggle();
      }
    });
  }

  submitProperty() {
    fetch('/api/properties', safeCredentials ({
      method: 'POST',
      body: JSON.stringify({
        property: {
          title: this.state.title,
          description: this.state.description,
          city: this.state.city,
          country: this.state.country,
          property_type: this.state.type,
          price_per_night: this.state.price,
          max_guests: this.state.maxGuests,
          bedrooms: this.state.bedrooms,
          beds: this.state.beds,
          baths: this.state.baths,
        }
      })
    }))
    .then(handleErrors)
    .then(data => {
      if (data.properties) {
        console.log(data);
        this.props.toggle();
      }
    });
  }

  render() {
    const { title, description, city, country, type, price, maxGuests, bedrooms, beds, baths } = this.state;

    return (
      <React.Fragment>
        <div className="border rounded shadow-sm p-4 mb-4">
          <h4 className=" mb-3">New Property</h4>
          <form onSubmit={(e) => { e.preventDefault(); this.state.propertyId ? this.updateProperty() : this.submitProperty(); }}>
            <input type="text" name="title" className="form-control mb-3" placeholder="Property title" value={title} onChange={this.handleChange} required />
            <input type="text" name="description" className="form-control mb-3" placeholder="Property description" value={description} onChange={this.handleChange} required />
            <hr />
            <h6>Property Location</h6>
            <input type="text" name="city" className="form-control mb-3" placeholder="City" value={city} onChange={this.handleChange} />
            <input type="text" name="country" className="form-control mb-3" placeholder="Country" value={country} onChange={this.handleChange} />
            <hr />
            <h6>Property Details</h6>
            <select id="propertyType" name="type" className="form-control mb-3" value={type} onChange={this.handleChange} required>
              <option value="" disabled>Select your property type</option>
              <option value="studio">Studio</option>
              <option value="room in hotel">Room in hotel</option>
              <option value="private room in apartment">Private room in apartment</option>
              <option value="entire apartment">Entire apartment</option>
              <option value="entire condiminium">Entire condominium</option>
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
            <button type="submit" className="btn btn-large btn-danger btn-block mb-3">Add</button>
          </form>
          <button type="cancel" className="btn btn-large btn-danger btn-block" onClick={this.props.toggle}>Cancel</button>
        </div>
      </React.Fragment>
    );
  }
}

export default PropertyWidget;
