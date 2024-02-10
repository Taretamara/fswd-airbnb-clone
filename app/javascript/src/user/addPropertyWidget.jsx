import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class AddPropertyWidget extends React.Component {
  state = {
    authenticated: false,
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
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

    this.submitProperty();
  };

  submitProperty = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

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
        window.location.replace("/user");
        console.log(data)
      }
    })
    .catch(error => {
      this.setState({
        error: 'Could not sign up.',
      })
    })
};

render () {
  const {title, description, city, country, type, price, maxGuests, bedrooms, beds, baths } = this.state;


  return (
    <React.Fragment>
    <div className="border rounded shadow-sm p-4 mb-4">
      <h4 className=" mb-3">New Property</h4>
      <form onSubmit={this.submitProperty}>
       <input type="text" className="form-control mb-3" placeholder="Property title" value={title} onChange={this.handleChange} required ></input>
        <input type="text" className="form-control mb-3" placeholder="Property description"  value={description} onChange={this.handleChange} required ></input>
        <hr />
        <h6>Property Location</h6>
        <input type="text" className="form-control mb-3" placeholder="City" value={city} onChange={this.handleChange}></input>
        <input type="text" className="form-control mb-3" placeholder="Country" value={country} onChange={this.handleChange}></input>
        <hr />
        <h6>Property Details</h6>
        <select id="propertyType"  className="form-control mb-3" value={type} onChange={this.handleChange} required>
          <option value="" disabled selected>Select your property type</option>
          <option value="studio">Studio</option>
          <option value="room in hotel">Room in hotel</option>
          <option value="private room in apartment">Private room in apartment</option>
          <option value="entire apartment">Entire apartment</option>
          <option value="entire condiminium">Entire condiminimum</option>
          <option value="entire house">Entire house</option>
        </select>
        <div className="input-group  mb-3">
          <span className="input-group-text">$</span>
          <input type="number" id="price"  className="form-control" value={price} onChange={this.handleChange} placeholder="Nightly Rate"  required></input>
        </div>
        <input type="number" id="guests" className="form-control mb-3" value={maxGuests} onChange={this.handleChange} placeholder="Max Guests" required></input>
        <input type="number" id="bedrooms" className="form-control mb-3" value={bedrooms} onChange={this.handleChange} placeholder="Number of Bedrooms" required></input>
        <input type="number" id="beds" className="form-control mb-3" value={beds} onChange={this.handleChange} placeholder="Number of Beds" required></input>
        <input type="number" id="baths" className="form-control mb-3" value={baths} onChange={this.handleChange} placeholder="Number of Baths" required></input>
        <button type="submit" className="btn btn-large btn-danger btn-block  mb-3">Add</button>
      </form>
      <button type="cancel" className="btn btn-large btn-danger btn-block" onClick={this.props.toggle}>Cancel</button>
    </div>
    </React.Fragment>
  )
}
}
export default AddPropertyWidget;
