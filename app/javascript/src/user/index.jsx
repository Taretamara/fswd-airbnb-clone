// user index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Property from './property'; // need to change this to the functions

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Property property_id={data.property_id} />, //need to change this so that it changes between property and bookings depending on what is clicked.
    document.body.appendChild(document.createElement('div')),
  )
})