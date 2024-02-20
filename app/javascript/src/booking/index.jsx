// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import BookingSuccessful from './bookingSuccessful';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BookingSuccessful />,
    document.body.appendChild(document.createElement('div')),
  )
})