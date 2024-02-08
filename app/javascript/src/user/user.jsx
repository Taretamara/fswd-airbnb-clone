// User
import React, { useState, useEffect } from 'react';
import PropertyList from './PropertyList';
import ReservationList from './ReservationList';

const UserPage = () => {
  const [displayProperties, setDisplayProperties] = useState(true);
  const [displayReservations, setDisplayReservations] = useState(false);
  const [properties, setProperties] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch initial data (properties) when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const propertiesResponse = await fetch('/api/user/properties');
      const propertiesData = await propertiesResponse.json();
      setProperties(propertiesData);

      const reservationsResponse = await fetch('/api/user/reservations');
      const reservationsData = await reservationsResponse.json();
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleDisplayProperties = () => {
    setDisplayProperties(true);
    setDisplayReservations(false);
  };

  const toggleDisplayReservations = () => {
    setDisplayProperties(false);
    setDisplayReservations(true);
  };

  return (
    <div>
      <button onClick={toggleDisplayProperties}>
        Show Properties
      </button>
      <button onClick={toggleDisplayReservations}>
        Show Reservations
      </button>
      {displayProperties && <PropertyList properties={properties} />}
      {displayReservations && <ReservationList reservations={reservations} />}
    </div>
  );
};

export default UserPage;
