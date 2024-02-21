// propertylist
import React, { useEffect, useState } from 'react';
import AddPropertyWidget from './addPropertyWidget';
import UpdatePropertyWidget from './updatePropertyWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './user.scss';

class PropertyList extends React.Component {
  state = {
    show_add_widget: false,
    show_update_widget: false,
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
    property: {
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
      id: null,
      images: [],
    },
  }

  //-------fetch properties-----------
  componentDidMount() {
    this.fetchProperties();
  };

  fetchProperties = () => {
    fetch('/api/user/properties?page=1')
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/user/properties?page=${this.state.next_page}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  //-------------Delete Properties-------------
  handleDelete = (id) => {
    fetch(`/api/properties/${id}`, safeCredentials ({
      method: 'DELETE',
      body: JSON.stringify({

      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.fetchProperties();
      })
  };

  //-------------Toggle AddWidget-----------------
  toggleAdd = () => {
    this.setState(prevState => ({
      show_add_widget: !prevState.show_add_widget,
    }));
  }

//-------------Toggle UpdateWidget-----------------
toggleUpdate = () => {
  this.setState(prevState => ({
    show_update_widget: !prevState.show_update_widget,
  }));
}

editProperty = (id) => {
  this.setState(prevState => ({
    show_update_widget: !prevState.show_update_widget,
  }));
  fetch(`/api/properties/${id}`)
    .then(handleErrors)
    .then(data => {
      console.log(data);

      this.setState({
        property: data.property,
      })
    })
}

componentDidUpdate(prevProps, prevState) {
  if ((prevState.show_add_widget !== this.state.show_add_widget && !this.state.show_add_widget) ||
      (prevState.show_update_widget !== this.state.show_update_widget && !this.state.show_update_widget)) {
    this.fetchProperties();
  }
}

  render () {
    const { show_add_widget, show_update_widget, properties, next_page, loading  } = this.state;
    return (
      <div className=" ms-5">
        <div className="row">
          <h3>Your Properties</h3>
        </div>
        <div className="row">
          {show_add_widget ? (
            <AddPropertyWidget toggle={this.toggleAdd} />
          ) : (
            <div>
              <p>Do you want to add a <button type="button" className="btn btn-link text-decoration-none p-0 m-0" onClick={this.toggleAdd}>property</button>?</p>
            </div>
          )}
          </div>
          <div className="col-12">
            {properties.map(property => {
              return (
                <div key={property.id} className="property row mb-2">
                  <div className="col-6">
                    <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                      <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.images})` }} />
                    </a>
                  </div>
                  <div className="col-6 position-relative">
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                    <h6>Bookings:</h6>
                  </div>
                  <div className="col-12">
                    {show_update_widget ? (
                      <UpdatePropertyWidget toggle={()=>this.editProperty(property.id)} property={this.state.property} />
                    ) : (
                      <button type="button" className="btn btn-link p-0 me-2 text-danger" onClick={() => this.editProperty(property.id)}>Edit</button>
                    )}
                    <button type="button" className="btn btn-link p-0 text-danger" onClick={() => this.handleDelete(property.id)}>Delete</button>
                  </div>
                  <hr className="m-3"/>
                </div>
              );
            })}
          </div>
          {loading && <p>loading...</p>}
          {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          }
      </div>
    )
  }
};

export default PropertyList;