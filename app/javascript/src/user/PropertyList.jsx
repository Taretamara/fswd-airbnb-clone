// propertylist
import React, { useEffect, useState } from 'react';
import PropertyWidget from './propertyWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './user.scss';

class PropertyList extends React.Component {
  state = {
    show_widget: false,
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
  }

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

  //toggel widget
  toggle = () => {
    this.setState(prevState => ({
      show_widget: !prevState.show_widget,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show_widget !== this.state.show_widget && !this.state.show_widget) {
      this.fetchProperties();
    }
  }
  
  render () {
    const { show_widget, properties, next_page, loading  } = this.state;
    return (
      <div className=" ms-5">
        <div className="row">
          <h3>Your Properties</h3>
        </div>
        <div className="row">
          {show_widget ? (
            <PropertyWidget toggle={this.toggle} />
          ) : (
            <div>
              <p>Do you want to add a <button type="button" className="btn btn-link text-decoration-none p-0 m-0" onClick={this.toggle}>property</button>?</p>
            </div>
          )}
          </div>
          <div className="col-12">
          {properties.map(property => {
              return (
                <div key={property.id} className="property row mb-2">
                  <div className="col-6">
                    <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                      <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                    </a>
                    </div>
                    <div className="col-6 position-relative">
                      <div className="position-absolute top-0 end-0">
                        <button type="button" className="btn btn-link p-0 text-danger" onClick={() => this.toggle(property.id)}>Edit</button>
                        <button type="button" className="btn btn-link p-0 text-danger" onClick={() => this.handleDelete(property.id)}>Delete</button>
                      </div>
                      <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                      <h6 className="mb-0">{property.title}</h6>
                      <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                      <h6>Bookings:</h6>
                    </div>
                </div>
              )
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
