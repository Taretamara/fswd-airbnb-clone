// User
import React, { useState, useEffect } from 'react';
import PropertyList from './PropertyList';
import BookingList from './BookingnList';

const UserPage = () => {
  const [displayProperties, setDisplayProperties] = useState(true);
  const [displayBookings, setBookings] = useState(false);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

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
    setDisplayBookings(false);
  };

  const toggleDisplayReservations = () => {
    setDisplayProperties(false);
    setDisplayBookings(true);
  };

  return (
    <div>
      <button onClick={toggleDisplayProperties}>
        My Properties
      </button>
      <button onClick={toggleDisplayBookings}>
        My Bookings
      </button>
      {displayProperties && <PropertyList properties={properties} />}
      {displayBookings && <BookingList reservations={bookings} />}
    </div>
  );
};

export default UserPage;
