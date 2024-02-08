//BookingList
import React, { useState, useEffect } from 'react';

const BookingList = () => {
  const [displayBookings, setBookings] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch initial data (properties) when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const reservationsResponse = await fetch('/api/user/reservations');
      const reservationsData = await reservationsResponse.json();
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div>
      
    </div>
  );
};

export default BookingList;
