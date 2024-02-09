// propertylist
import React from 'react';
import AddPropertyWidget from './addPropertyWidget';

const PropertyList = () => {

const handleDelete = (id) => {
    fetch(`/api/properties/${id}`, safeCredentials ({
      method: 'DELETE',
      body: JSON.stringify({

      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        refreshPage();
      })
  };
  
  return (
    <div className="row ms-5">
      <h3>Your Properties</h3>
    </div>
    <div className="row">
      <p> Do you want to add a </p>
      <a href={`/addPropertyWidget?redirect_url=${window.location.pathname}`}>property</a>
      <p>?</p>
    </div>
    {properties.map(tweet => (
          <div className="row" key={property.id}>
            <button className="delete position-absolute top-0 end-0 m-1" onClick={()=>handleDelete(property.id)} >X</button>
            <h5><a href={`/property/${property.id}`}>{property.title}</a></h5>
            <p className="p-1 ps-2 m-2">{property.description}</p>
        </div>        
        ))}
    {properties.map(property => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                </div>
              )
            })}
  );
};

export default PropertyList;
