//BookingList
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class BookingList extends React.Component {
 
  render () {
    
    return (
      <div className=" ms-5">
        <div className="row">
          <h3>Your Bookings</h3>
        </div>
        <div className="row">
         
        </div>
      </div>
    )
  }
};

export default BookingList;

