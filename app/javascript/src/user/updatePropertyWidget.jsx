import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
//need to add pictures

class UpdatePropertyWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id || null,
      title: props.property.title || '',
      description: props.property.description || '',
      city: props.property.city || '',
      country: props.property.country || '',
      type: props.property.property_type || '',
      price: props.property.price_per_night || '',
      maxGuests: props.property.max_guests || '',
      bedrooms: props.property.bedrooms || '',
      beds: props.property.beds || '',
      baths: props.property.baths || '',
      id: props.property.id || null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.property !== this.props.property) {
      this.setState({
        title: this.props.property.title || '',
        description: this.props.property.description || '',
        city: this.props.property.city || '',
        country: this.props.property.country || '',
        type: this.props.property.property_type || '',
        price: this.props.property.price_per_night || '',
        maxGuests: this.props.property.max_guests || '',
        bedrooms: this.props.property.bedrooms || '',
        beds: this.props.property.beds || '',
        baths: this.props.property.baths || '',
        id: this.props.property.id,
      });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  updateProperty() {
    fetch(`/api/properties/${this.state.id}`, safeCredentials ({
      method: 'POST',
      body: JSON.stringify({
        property: {
          id: this.state.id,
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
    const { title, description, city, country, type, price, maxGuests, bedrooms, beds, baths} = this.state;
    return (
      <React.Fragment>
        <div className="border rounded shadow-sm p-4 mb-4">
          <h4 className=" mb-3">New Property</h4>
          <form onSubmit={(e) => { e.preventDefault(); this.updateProperty(this.state.id); this.props.toggle(); }}>
            <input type="text" name="title" className="form-control mb-3" placeholder="Property title" value={title} onChange={this.handleChange} />
            <input type="text" name="description" className="form-control mb-3" placeholder="Property description" value={description} onChange={this.handleChange}/>
            <hr />
            <h6>Property Location</h6>
            <input type="text" name="city" className="form-control mb-3" placeholder="City" value={city} onChange={this.handleChange}/>
            <input type="text" name="country" className="form-control mb-3" placeholder="Country" value={country} onChange={this.handleChange}/>
            <hr />
            <h6>Property Details</h6>
            <select id="propertyType" name="type" className="form-control mb-3" value={type} onChange={this.handleChange}>
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
              <input type="number" id="price" name="price" className="form-control" value={price} onChange={this.handleChange} placeholder="Nightly Rate" />
            </div>
            <input type="number" name="maxGuests" id="guests" className="form-control mb-3" value={maxGuests} onChange={this.handleChange} placeholder="Max Guests" />
            <input type="number" name="bedrooms" id="bedrooms" className="form-control mb-3" value={bedrooms} onChange={this.handleChange} placeholder="Number of Bedrooms" />
            <input type="number" name="beds" id="beds" className="form-control mb-3" value={beds} onChange={this.handleChange} placeholder="Number of Beds" />
            <input type="number" name="baths" id="baths" className="form-control mb-3" value={baths} onChange={this.handleChange} placeholder="Number of Baths" />
            <button type="submit" className="btn btn-large btn-danger btn-block mb-3">Update</button>
          </form>
          <button type="cancel" className="btn btn-large btn-danger btn-block" onClick={this.props.toggle}>Cancel</button>
        </div>
      </React.Fragment>
    );
  }
}

export default UpdatePropertyWidget;
