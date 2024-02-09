// user index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import UserPage from './user'; 

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <UserPage />,
    document.body.appendChild(document.createElement('div')),
  )
})