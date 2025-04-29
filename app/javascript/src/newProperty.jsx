import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

class NewProperty extends React.Component {
  state = {
    title: '',
    description: '',
    city: '',
    country: '',
    property_type: '',
    price_per_night: '',
    max_guests: '',
    bedrooms: '',
    beds: '',
    baths: '',
    images: [], // for multiple image upload
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleImageChange = (event) => {
    this.setState({ images: Array.from(event.target.files) });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(this.state).forEach(key => {
      if (key === 'images') {
        this.state.images.forEach(image => {
          formData.append('property[images][]', image);
        });
      } else {
        formData.append(`property[${key}]`, this.state[key]);
      }
    });

    fetch('/api/properties', {
      method: 'POST',
      body: formData,
    })
      .then(handleErrors)
      .then(data => {
        console.log('Property created!', data);
        window.location.href = `/property/${data.property.id}`;
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="container mt-5">
          <h1>Add a New Property</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={this.handleChange} required />
            <input type="text" name="description" placeholder="Description" onChange={this.handleChange} required />
            <input type="text" name="city" placeholder="City" onChange={this.handleChange} required />
            <input type="text" name="country" placeholder="Country" onChange={this.handleChange} required />
            <input type="text" name="property_type" placeholder="Property Type" onChange={this.handleChange} required />
            <input type="number" name="price_per_night" placeholder="Price per night" onChange={this.handleChange} required />
            <input type="number" name="max_guests" placeholder="Max guests" onChange={this.handleChange} required />
            <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={this.handleChange} required />
            <input type="number" name="beds" placeholder="Beds" onChange={this.handleChange} required />
            <input type="number" name="baths" placeholder="Baths" onChange={this.handleChange} required />
            
            <input type="file" multiple onChange={this.handleImageChange} />
            
            <button type="submit">Create Property</button>
          </form>
        </div>
      </Layout>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('new-property');
  if (node) {
    ReactDOM.render(<NewProperty />, node);
  }
});
