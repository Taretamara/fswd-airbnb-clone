// propertylist
import React from 'react';
import AddPropertyWidget from './addPropertyWidget';

const PropertyList = () => {

  return (
    <div className="row ms-5">
      <h3>Your Properties</h3>
    </div>
    <div className="row ms-5">
      <AddPropertyWidget />
    </div>
  );
};

export default PropertyList;
