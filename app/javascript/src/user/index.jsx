// user index.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import UserPage from './user'; 

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Layout></Layout>
    <UserPage />,
    document.body.appendChild(document.createElement('div')),
    </Layout>
  )
})
