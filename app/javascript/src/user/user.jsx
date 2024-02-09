// User
import React, { useState } from 'react';
import Layout from '@src/layout';
import PropertyList from './PropertyList';
import BookingList from './BookingList';

const UserPage = () => {
  const [displayProperties, setDisplayProperties] = useState(true);
  const [displayBookings, setDisplayBookings] = useState(false);

  const toggleDisplayProperties = () => {
    setDisplayProperties(true);
    setDisplayBookings(false);
  };

  const toggleDisplayBookings = () => {
    setDisplayProperties(false);
    setDisplayBookings(true);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-3 border rounded shadow-sm pt-2 pb-5 ps-3">
            <h4 className="mt-3">User Dashboard</h4>
            <button type="button" className="btn btn-link text-decoration-none" onClick={toggleDisplayProperties}>
              My Properties
            </button>
            <button type="button" className="btn btn-link text-decoration-none" onClick={toggleDisplayBookings}>
              My Bookings
            </button>
          </div>
          <div className="col-9">
            {displayProperties && <PropertyList />}
            {displayBookings && <BookingList />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
