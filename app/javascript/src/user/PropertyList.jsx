// propertylist
import React, { useState, useEffect } from 'react';

const PropertyList = () => {
  const [displayProperties, setDisplayProperties] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch initial data (properties) when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const propertiesResponse = await fetch('/api/user/properties');
      const propertiesData = await propertiesResponse.json();
      setProperties(propertiesData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      
    </div>
  );
};

export default PropertyList;
