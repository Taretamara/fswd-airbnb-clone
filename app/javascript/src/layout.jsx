// layout.js
import React from 'react';
import { safeCredentials, handleErrors} from './utils/fetchHelper';

const Layout = (props) => {
  const handleSignOut = (event) => {
    event.preventDefault();

    fetch('/api/sessions', safeCredentials ({
      method: 'DELETE',
      body: JSON.stringify({

      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        window.location.replace("/");
      })
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user">Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleSignOut}>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
