// propertylist
import React from 'react';
import AddPropertyWidget from './addPropertyWidget';

const PropertyList = () => {

  return (
    <div className="row ms-5">
      <h3>Your Properties</h3>
    </div>
    <div className="row ms-5">
      <p> Do you want to add a </p>
      <a href={`/addPropertyWidget?redirect_url=${window.location.pathname}`}>property</a>
      <p>?</p>
    </div>
  );
};

export default PropertyList;
