// user index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

<div className="container">
  <div className="row">
    <div className="col-3">
      <h3>User Dashboard</h3>
      <p>Properties</p>
      <p>Bookings</p>
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
