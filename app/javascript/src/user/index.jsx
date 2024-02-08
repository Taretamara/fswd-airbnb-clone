// user index.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import UserPage from './user'; 

<div className="container">
  <div className="row">
    <div className="col-3">
      <h3>User Dashboard</h3>
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
    </div>
    <div className="col-9">
      document.addEventListener('DOMContentLoaded', () => {
        ReactDOM.render(
          <User />,
          document.body.appendChild(document.createElement('div')),
        )
      })
     </div>
  </div>
</div>
